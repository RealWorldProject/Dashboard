document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elems, {});
});

var elem = document.querySelector(".modal");
var instance = M.Modal.init(elem);

// for pagination
let pageNumber = 1;
let sn = 1;
let proPerPage = 3;
//for data
const proTableTbody = document.querySelector(".container-product tbody");
const proForm = document.querySelector("#addProductForm");
const btnAdd = document.querySelector("#btnAdd");
const info = document.querySelector("#info");
document.querySelector(".add").addEventListener("click", function () {
	instance.open();
});
// to add product data
proForm.onsubmit = async (e) => {
	e.preventDefault();
	const data = {
		name: e.target[0].value,
		price: e.target[1].value,
		qty: e.target[2].value,
		barcode: e.target[3].value,
		productID: document.querySelector("#productID").value,
	};
	console.log(data);
	let addProduct;
	if (btnAdd.innerText == "ADD PRODUCT") {
		addProduct = await fetch(
			"http://localhost:5000/admin/product/add-product",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		M.toast({ html: "Product Added Successfully", displayLength: 2000 });
		proForm[0].value = "";
		proForm[1].value = "";
		proForm[2].value = "";
		proForm[3].value = "";
	} else {
		addProduct = await fetch(
			"http://localhost:5000/admin/product/update-product",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		instance.close();
		M.toast({ html: "Product Updated Successfully", displayLength: 3000 });
		btnAdd.innerText = "ADD PRODUCT";
		info.textContent = "Add a new product using this form. Fill them all.";
		proForm[0].value = "";
		proForm[1].value = "";
		proForm[2].value = "";
		proForm[3].value = "";
	}

	allProducts();
};

// function to get product
const allProducts = async () => {
	let allProducts = await fetch(
		`http://localhost:5000/admin/product/all-product?page=${pageNumber}`
	);
	allProducts = await allProducts.json();

	addToProTable(allProducts);

	removeProduct();

	editProduct();

	checkPagination(allProducts);
};

window.onload = () => {
	allProducts();
	console.log("Product load on window");
};

const addToProTable = (products) => {
	let html = "";

	for (const product of products) {
		html += `
    <tr class ="row${product._id}">
      <td>${sn}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.qty}</td>
      <td>${product.barcode}</td>
      
      <td>
        <button class="editbtn btn"  id="edit-${product._id}"><i class="fa fa-pencil edit" aria-hidden="true"></i></button>
        <button class="removebtn btn" id="${product._id}" ><i class="fa fa-trash trash" aria-hidden="true"></i></button></td>
        </td>
		</tr>
    `;
		sn++;
	}
	proTableTbody.innerHTML = html;
};

// delete product
const removeProduct = () => {
	const removeBtns = document.querySelectorAll(".removebtn");
	removeBtns.forEach((removeBtn) => {
		removeBtn.addEventListener("click", async (e) => {
			console.log(e.target);
			const productID = e.target.parentElement.id;
			console.log(productID);
			let result = await fetch(
				`http://localhost:5000/admin/product/delete-product/${productID}`
			);
			result = await result.json();
			if (result.status)
				document.querySelector(`.row${productID}`).remove();
			allProducts();
		});
	});
};

// edit product
const editProduct = () => {
	const editBtns = document.querySelectorAll(".editbtn");
	editBtns.forEach((editBtn) => {
		editBtn.addEventListener("click", (e) => {
			instance.open();
			productID = e.target.parentElement.id.split("-")[1];
			const row = document.querySelectorAll(`.row${productID} td`);
			proForm[0].value = row[1].innerText;
			proForm[1].value = row[2].innerText;
			proForm[2].value = row[3].innerText;
			proForm[3].value = row[4].innerText;
			document.querySelector("#productID").value = productID;

			document.getElementById("addProductForm").style.display = "block";
			btnAdd.innerText = "Update";
			info.textContent =
				"Use this form to update the product details. All details are required.";
			allProducts();
		});
	});
};

const checkPagination = (products) => {
	if (pageNumber == 1) {
		document.querySelector(".previous").style.display = "none";
	} else {
		document.querySelector(".previous").style.display = "inline-block";
	}

	if (products.length < proPerPage) {
		document.querySelector(".next").style.display = "none";
	} else {
		document.querySelector(".next").style.display = "inline-block";
	}
};

document.querySelector(".previous").addEventListener("click", () => {
	pageNumber--;

	allProducts();
	sn--;
});
document.querySelector(".next").addEventListener("click", () => {
	pageNumber++;
	allProducts();
});
