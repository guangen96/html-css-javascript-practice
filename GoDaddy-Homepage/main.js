var dropdown = Array.from(document.getElementsByClassName("dropdown"));
var dropdownOverlay = document.getElementById("dropdown-overlay");
var signin = document.getElementById("signin");

for (i = 0; i < dropdown.length; i++) {
  // Close dropdown if click outside
  dropdownOverlay.addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length) {
      var target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      current[0].classList.remove("active");
      dropdownOverlay.style.display = "none";
    }
  });

  // open/close dropdown when button is clicked
  dropdown[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    // Close dropdown if click button when dropdown is opened
    if (this.classList.contains("active")) {
      var target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      this.classList.remove("active");
      dropdownOverlay.style.display = "none";
      return;
    }
    // Open dropdown if click button
    // Check if dropdown already open
    var current = document.getElementsByClassName("active");
    // If dropdown already open, remove existing content
    if (current.length) {
      var target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      current[0].classList.remove("active");
      this.classList.remove("animation");
    }
    // If dropdown not open, add animation
    else this.classList.add("animation");
    this.classList.add("active");
    // Add overlay, grey if main nav, white if signin
    dropdownOverlay.style.display = "block";
    dropdownOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    if (!signin.classList.contains("active"))
      dropdownOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  });
}
