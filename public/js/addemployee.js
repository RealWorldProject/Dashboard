document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
});

var elem = document.querySelector(".modal");
var instance = M.Modal.init(elem);

// for pagination
let pageNumber = 1;
// let sn = 1;
let empPerPage = 3;
//for data
const empTableTbody = document.querySelector(".container-employee tbody");
const empForm = document.querySelector("#addEmployeeForm");
const btnAdd = document.querySelector("#btnAdd");
const info = document.querySelector("#info");
document.querySelector(".add").addEventListener("click", function () {
  instance.open();
});
// to add employee data
empForm.onsubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: e.target[0].value,
    username: e.target[1].value,
    password: e.target[2].value,
    access: e.target[3].value,
    employeeID: document.querySelector("#employeeID").value,
  };
  console.log(data);
  let addEmployee;
  if (btnAdd.innerText == "ADD EMPLOYEE") {
    addEmployee = await fetch(
      "http://localhost:5000/admin/employee/add-employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    M.toast({ html: "Employee Added Successfully", displayLength: 2000 });
    empForm[0].value = "";
    empForm[1].value = "";
    empForm[2].value = "";
  } else {
    addEmployee = await fetch(
      "http://localhost:5000/admin/employee/update-employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    instance.close();
    M.toast({ html: "Employee Updated Successfully", displayLength: 2000 });
    btnAdd.innerText = "ADD EMPLOYEE";
    info.textContent = "Create a new employee using this form. Fill them all.";
    empForm[0].value = "";
    empForm[1].value = "";
    empForm[2].value = "";
  }

  // let test = await addEmployee.json();
  // btnAdd.innerText = "Add Employee";
  allEmployees();
};

// function to get employee
const allEmployees = async () => {
  let allEmployees = await fetch(
    `http://localhost:5000/admin/employee/all-employee?page=${pageNumber}`
  );
  allEmployees = await allEmployees.json();

  addToEmpTable(allEmployees);

  removeEmployee();

  editEmployee();

  checkPagination(allEmployees);
};

window.onload = () => {
  allEmployees();
  console.log("Employee load on window");
};

const addToEmpTable = (employees) => {
  let html = "";
  let sn = (pageNumber - 1) * empPerPage + 1;
  for (const employee of employees) {
    html += `
    <tr class ="row${employee._id}">
      <td>${sn}</td>
      <td>${employee.name}</td>
      <td>${employee.username}</td>
      <td>${employee.password}</td>
      <td>${employee.access}</td>
      
      <td>
        <button class="editbtn btn"  id="edit-${employee._id}"><i class="fa fa-pencil edit" aria-hidden="true"></i></button>
        <button class="removebtn btn" id="${employee._id}" ><i class="fa fa-trash trash" aria-hidden="true"></i></button></td>
        </td>
		</tr>
    `;
    sn++;
  }
  empTableTbody.innerHTML = html;
};

// delete employee
const removeEmployee = () => {
  const removeBtns = document.querySelectorAll(".removebtn");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", async (e) => {
      console.log(e.target);
      const employeeID = e.target.parentElement.id;
      console.log(employeeID);
      let result = await fetch(
        `http://localhost:5000/admin/employee/delete-employee/${employeeID}`
      );
      result = await result.json();
      if (result.status) document.querySelector(`.row${employeeID}`).remove();
      allEmployees();
    });
  });
};

// edit employee
const editEmployee = () => {
  const editBtns = document.querySelectorAll(".editbtn");
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      instance.open();
      employeeID = e.target.parentElement.id.split("-")[1];
      const row = document.querySelectorAll(`.row${employeeID} td`);
      empForm[0].value = row[1].innerText;
      empForm[1].value = row[2].innerText;
      empForm[2].value = row[3].innerText;
      empForm[3].value = row[4].innerText;
      document.querySelector("#employeeID").value = employeeID;

      document.getElementById("addEmployeeForm").style.display = "block";
      btnAdd.innerText = "Update Employee";
      info.textContent =
        "Use this form to update the employee details. All details are required.";
      allEmployees();
    });
  });
};

const checkPagination = (employees) => {
  if (pageNumber == 1) {
    document.querySelector(".previous").style.display = "none";
  } else {
    document.querySelector(".previous").style.display = "inline-block";
  }

  if (employees.length < empPerPage) {
    document.querySelector(".next").style.display = "none";
  } else {
    document.querySelector(".next").style.display = "inline-block";
  }
};

document.querySelector(".previous").addEventListener("click", () => {
  pageNumber--;

  allEmployees();
});
document.querySelector(".next").addEventListener("click", () => {
  pageNumber++;
  allEmployees();
});

const searchEmp = async () => {
  const data = {
    searchTerm: document.querySelector("#search").value,
  };
  let allEmployees = await fetch(
    "http://localhost:5000/admin/employee/search-employee",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  allEmployees = await allEmployees.json();
  addToEmpTable(allEmployees);

  removeEmployee();

  editEmployee();
  checkPagination();
};

document.querySelector("#search").addEventListener("keyup", () => {
  searchEmp();

  if (document.querySelector("#search").value < 1) {
    allEmployees();
  }
});
