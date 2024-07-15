var toggle = document.getElementById("pricing-table-toggle");
var hover = document.getElementsByClassName("hover");
var hover2 = document.getElementById("hover");
var display = document.getElementsByClassName(
  "nav-sub-list-type-2-expanded-card"
);
var acc = document.getElementsByClassName("accordion");
var acc2 = document.getElementsByClassName("accordion-2");
var i;

toggle.addEventListener("click", changeDisplay);

console.log(hover);

for (i = 0; i < hover.length; i++) {
  hover[i].addEventListener("mouseover", function () {
    var panel = this.nextElementSibling;
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

for (let i = 0; i < acc2.length; i++) {
  acc2[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.display === "inline-flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "inline-flex";
    }
  });
}

function changeDisplay() {
  changeBillYearly();
  changeAddOns();
}

function changeBillYearly() {
  var list = document.getElementsByClassName("billed-yearly");
  for (let i = 0; i < list.length; i++) {
    toggle.checked
      ? (list[i].style.display = "block")
      : (list[i].style.display = "none");
  }
}

function changeAddOns() {
  if (toggle.checked) {
    document.getElementById("yearly").style.display = "flex";
    document.getElementById("monthly").style.display = "none";
  } else {
    document.getElementById("yearly").style.display = "none";
    document.getElementById("monthly").style.display = "flex";
  }
}
