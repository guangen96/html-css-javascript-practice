var dropdown = Array.from(document.getElementsByClassName("dropdown"));
var dropdownOverlay = document.getElementById("dropdown-overlay");

console.log(dropdownOverlay);

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    // Close dropdown if click button when dropdown is opened
    if (this.classList.contains("active")) {
      console.log(this.className);
      this.classList.remove("active");
      dropdownOverlay.style.display = "none";
      console.log(this.className);
      return;
    }
    // Open dropdown if click button
    var current = document.getElementsByClassName("active");
    if (current.length) current[0].classList.remove("active");
    this.classList.add("active");
    dropdownOverlay.style.display = "block";
  });
}
