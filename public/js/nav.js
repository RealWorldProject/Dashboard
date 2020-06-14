document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems, {});
});

var elem = document.querySelector(".collapsible.expandable");
var instance = M.Collapsible.init(elem, {
  accordion: false,
});

var btns = document.getElementsByClassName("btn-toggle");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (e) {
    // finding all the classes of the clicked <li>
    const classList = e.target.parentElement.classList;
    const current = document.getElementsByClassName("active");
    //console.log(current);
    // removing the active class
    if (current.length > 0) {
      const currentClassList = current[1].classList;
      currentClassList.remove("active");
      currentClassList.remove("change-color");
    }
    // adding the active class to highlight the selected link
    classList.add("active");
    classList.add("change-color");
  });
}
