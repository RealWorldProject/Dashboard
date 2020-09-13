document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".modal");
	var instances = M.Modal.init(elems, {});
});

const grandTotal = document.querySelector("#grandTotal");
const amountPaid = document.querySelector("#amountPaid");
const billGrandTotal = document.querySelector("#billGrandTotal");
const billPaid = document.querySelector("#billPaid");
const billDue = document.querySelector("#billDue");
calculateTotal();
// Data stuffs
function calculateTotal() {
	let totalPrice = 0;
	document
		.querySelectorAll(".devicetable tbody #prodTotal")
		.forEach((prod) => {
			totalPrice += parseInt(prod.innerText);
		});
	grandTotal.value = totalPrice;
}

amountPaid.addEventListener("keydown", () => {
	amountPaid.classList.remove("error");
});

// for checkout
const checkout = document.querySelector(".checkout");

checkout.addEventListener("click", async () => {
	let url = window.location.href.split("/");
	const deviceID = url[url.length - 1];
	const data = {
		deviceID: deviceID,
		totalPrice: grandTotal.value,
		paid: amountPaid.value,
	};
	let billData = await fetch(
		"http://localhost:5000/billing/device-dashboard/checkout",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
	);
	billData = await billData.json();
	updateCheckoutModal(billData.billID);
});

const updateCheckoutModal = async (billID) => {
	let data = await fetch(
		`http://localhost:5000/billing/device-dashboard/checkout/${billID}`
	);
	data = await data.json();
	console.log(data);
	const billTable = document.querySelector(".billTable tbody");
	let html = "";
	let sn = 1;
	data.products.forEach((product) => {
		html += `
		<tr>
			<td>${sn}</td>
			<td id="prodName">${product.product.name}</td>
			<td id="prodPrice">${product.product.price}</td>
			<td id="prodQty">${product.quantity}</td>
			<td id="prodTotal">${product.quantity * product.product.price}</td>
		</tr>`;
		sn++;
	});
	billTable.innerHTML = html;
	billGrandTotal.innerText = data.totalPrice;
	document.querySelector(".billNumber").innerText = data._id;
	billPaid.innerText = data.paid == null ? 0 : data.paid;
	let returnAmount =
		parseInt(billPaid.innerText) - parseInt(billGrandTotal.innerText);
	returnAmount =
		returnAmount < 0 ? `Due: ${Math.abs(returnAmount)}` : returnAmount;
	billDue.innerText = returnAmount;
};

// Remove
function toRemove() {
	const removeBtn = document.querySelectorAll(".removebtn");
	removeBtn.forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			let url = window.location.href.split("/");
			const deviceID = url[url.length - 1];
			const data = {
				productID: e.target.parentElement.value,
				deviceID: deviceID,
			};
			console.log(e.target);
			let billData = await fetch(
				"http://localhost:5000/billing/device-dashboard/delete",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
		});
	});
}

document.onload = toRemove();
