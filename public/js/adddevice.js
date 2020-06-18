document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
});

var elem = document.querySelector(".modal");
var instance = M.Modal.init(elem);

// // for pagination
// let pageNumber = 1;
// // let sn = 1;
// let empPerPage = 3;
//for data
const devTableTbody = document.querySelector(".container-device tbody");
const devForm = document.querySelector('#addDeviceForm');
const btnAdd = document.querySelector("#btnAdd");
const info = document.querySelector("#info");
document.querySelector(".add").addEventListener("click", function () {
    instance.open();
});
// to add device
console.log(devForm);
devForm.onsubmit = async (d) => {
    d.preventDefault();
    const data = {
        name: d.target[0].value,
        macaddress: d.target[1].value,
        active: d.target[2].value,
        deviceID: document.querySelector("#deviceID").value,
    };
    console.log(data);
    let addDevice;
    if (btnAdd.innerText == "ADD DEVICE") {
        addDevice = await fetch(
            "http://localhost:5000/admin/device/add-device",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        M.toast({ html: "Device Added Successfully", displayLength: 2000 });
        devForm[0].value = "";
        devForm[1].value = "";
        devForm[2].value = "";
    } else {
        addDevice = await fetch(
            "http://localhost:5000/admin/device/update-device",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        instance.close();
        M.toast({ html: "Device Updated Successfully", displayLength: 2000 });
        btnAdd.innerText = "ADD DEVICE";
        info.textContent = "Add a new device.";
        devForm[0].value = "";
        devForm[1].value = "";

    }


    allDevices();
};

// function to get employee
const allDevices = async () => {
    let allDevices = await fetch(
        `http://localhost:5000/admin/device/all-device`
    );
    allDevices = await allDevices.json();

    addToDevTable(allDevices);

    removeDevice();

    editDevice();

};

window.onload = () => {
    allDevices();
    console.log("Device load on window");
};

const addToDevTable = (devices) => {
    let html = "";
    let sn = 1;
    for (const device of devices) {
        html += `
      <tr class ="row${device._id}">
        <td>${sn}</td>
        <td>${device.name}</td>
        <td>${device.macaddress}</td>
        <td>${device.active}</td>
        <td>
          <button class="editbtn btn"  id="edit-${device._id}"><i class="fa fa-pencil edit" aria-hidden="true"></i></button>
          <button class="removebtn btn" id="${device._id}" ><i class="fa fa-trash trash" aria-hidden="true"></i></button></td>
          </td>
          </tr>
      `;
        sn++;
    }
    devTableTbody.innerHTML = html;
};

// delete device
const removeDevice = () => {
    const removeBtns = document.querySelectorAll(".removebtn");
    removeBtns.forEach((removeBtn) => {
        removeBtn.addEventListener("click", async (d) => {
            console.log(d.target);
            const deviceID = d.target.parentElement.id;
            console.log(deviceID);
            let result = await fetch(
                `http://localhost:5000/admin/device/delete-device/${deviceID}`
            );
            result = await result.json();
            if (result.status) document.querySelector(`.row${deviceID}`).remove();
            allDevices();
        });
    });
};

// edit device
const editDevice = () => {
    const editBtns = document.querySelectorAll(".editbtn");
    editBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", (d) => {
            instance.open();
            deviceID = d.target.parentElement.id.split("-")[1];
            const row = document.querySelectorAll(`.row${deviceID} td`);
            devForm[0].value = row[1].innerText;
            devForm[1].value = row[2].innerText;
            devForm[2].value = row[3].innerText;
            document.querySelector("#deviceID").value = deviceID;

            document.getElementById("addDeviceForm").style.display = "block";
            btnAdd.innerText = "Update Device";
            info.textContent = "Update the device details.";
            allDevices();
        });
    });
};
