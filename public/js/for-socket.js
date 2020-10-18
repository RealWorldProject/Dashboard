const socket = io();
const table = document.querySelector(".devicetable tbody");

socket.on("addedProducts", (data) => {
	let tableHtml = table.innerHTML;
	data = data.data;
	newData = data[data.length - 1];
	tableHtml += `
    <tr class="row${newData.product._id}">
        <td>1</td>
        <td id="prodName">${newData.product.name}</td>
        <td id="prodPrice">${newData.product.price}</td>
        <td id="prodQty">${newData.quantity}</td>
        <td id="prodTotal">${newData.quantity * newData.product.price}</td>
		<td>
			<button class="waves-effect waves-light removebtn" value="${
				newData.product._id
			}">
				<i class="material-icons left">delete</i>
			</button>
		</td>
    </tr>
    `;
	table.innerHTML = tableHtml;
	calculateTotal();
	toRemove();
});

socket.on("updatedProducts", (data) => {
	const prodQty = document.querySelectorAll(".devicetable tbody #prodQty");
	data = data.data;
	for (let index = 0; index < data.length; index++) {
		prodQty[index].innerText = data[index].quantity;
	}
	updateTotal();
});

const updateTotal = () => {
	const prodQty = document.querySelectorAll(".devicetable tbody #prodQty");
	const prodPrice = document.querySelectorAll(
		".devicetable tbody #prodPrice"
	);
	const prodTotal = document.querySelectorAll(
		".devicetable tbody #prodTotal"
	);
	//updating total of each products
	for (let index = 0; index < prodQty.length; index++) {
		prodTotal[index].innerText =
			parseInt(prodPrice[index].innerText) *
			parseInt(prodQty[index].innerText);
	}
	//updating the Grand Total
	calculateTotal();
};

socket.on("cartCleared", (data) => {
	table.innerHTML = "";
	grandTotal.value = 0;
});

socket.on("remove", (data) => {
	const productID = data.productID;
	document.querySelector(`.row${productID}`).remove();
});
socket.on("weightRemoved", (data) => {
	console.log(data);
});
