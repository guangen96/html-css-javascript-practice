var dropdown = Array.from(document.getElementsByClassName("dropdown"));
var dropdownOverlay = document.getElementById("dropdown-overlay");
var signin = document.getElementById("signin");

for (i = 0; i < dropdown.length; i++) {
  // Close dropdown if click outside
  dropdownOverlay.addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length) {
      current[0].classList.remove("active");
      dropdownOverlay.style.display = "none";
    }
  });

  // open/close dropdown when button is clicked
  dropdown[i].addEventListener("click", function () {
    // Close dropdown if click button when dropdown is opened
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      dropdownOverlay.style.display = "none";
      return;
    }
    // Open dropdown if click button
    var current = document.getElementsByClassName("active");
    if (current.length) current[0].classList.remove("active");
    this.classList.add("active");
    if (!signin.classList.contains("active"))
      dropdownOverlay.style.display = "block";
  });
}
