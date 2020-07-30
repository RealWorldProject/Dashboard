const mongoose = require("mongoose");
const socket = require("../socket");

const deviceSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	macaddress: String,
	status: Boolean,
	cart: {
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
	},
});

deviceSchema.methods.addToCart = async function (productID) {
	let cartProductIndex = -1;
	if (this.cart.items.length > 0) {
		cartProductIndex = this.cart.items.findIndex((p) => {
			return productID.toString() == p.product.toString();
		});
	}
	let newQty = 1;
	const updatedCartItems = [...this.cart.items];
	let event = ""; // for socket io event
	if (cartProductIndex >= 0) {
		// means the items is already in the cart
		newQty = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQty;
		event = "updatedProducts";
	} else {
		// means the items is not in the cart
		updatedCartItems.push({
			product: productID,
			quantity: newQty,
		});
		event = "addedProducts";
	}
	const updatedCart = {
		items: updatedCartItems,
	};
	this.cart = updatedCart;
	this.save();
	const data = await this.cart.populate("items.product").execPopulate();
	io = socket.getIO();
	io.emit(event, { data: data.items });
};

deviceSchema.methods.deleteFromCart = async function (productID) {
	const cartProductIndex = this.cart.items.findIndex((p) => {
		return productID == p.product;
	});
	let updatedCartItems = [...this.cart.items];
	console.log(cartProductIndex);
	console.log(productID);
	let qty = this.cart.items[cartProductIndex].quantity;
	let newQty = 0;
	let event = ""; // for socket io event
	if (qty > 1) {
		//decreasing quantity
		newQty = qty - 1;
		updatedCartItems[cartProductIndex].quantity = newQty;
		event = "updatedProducts";
	} else if (qty == 1) {
		// removing item
		updatedCartItems = updatedCartItems.filter(
			(p) => p.product.toString() != productID.toString()
		);
		event = "remove";
	}
	const updatedCart = {
		items: updatedCartItems,
	};
	this.cart = updatedCart;
	this.save();
	const data = await this.cart.populate("items.product").execPopulate();
	io = socket.getIO();
	if (event == "updatedProducts") {
		io.emit("updatedProducts", { data: data.items });
	} else {
		io.emit(event, { productID });
	}
};

deviceSchema.methods.clearCart = function () {
	this.cart = { items: [] };
	this.save();
};

module.exports = mongoose.model("Device", deviceSchema);
