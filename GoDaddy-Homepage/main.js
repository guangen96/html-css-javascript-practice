const dropdown = Array.from(document.getElementsByClassName("dropdown"));
const dropdownOverlay = document.getElementById("dropdown-overlay");
const signin = document.getElementById("signin");
const contentSelect = document.getElementsByClassName("content-two-select");
const contentThreeSelect = document.getElementsByClassName(
  "content-three-display-card"
);

for (let i = 0; i < contentThreeSelect.length; i++) {
  contentThreeSelect[i].addEventListener("mouseover", function () {
    const content = document.getElementsByClassName("content-three-display")[0]
      .children;
    const current = document
      .getElementsByClassName("content-three-display")[0]
      .getElementsByClassName("active");
    const currentSelect = document.querySelectorAll(
      ".content-three-display-card.active"
    );

    // only need execute if hover over not active select
    if (!content[i].classList.contains("active")) {
      // remove inactive then add active
      current[0].classList.remove("active");
      currentSelect[0].classList.remove("active");
      contentThreeSelect[0].classList.remove("active");

      contentThreeSelect[i].classList.add("active");
      content[i].classList.add("active");
    }
  });
}

for (let i = 0; i < contentSelect.length; i++) {
  contentSelect[i].addEventListener("click", function () {
    const content = document.getElementsByClassName("content-two-grid");
    const current = document.querySelectorAll(".content-two-grid.active");
    const currentSelect = document.querySelectorAll(
      ".content-two-select.active"
    );

    // only need execute if click button that's not the active dropdown
    if (!content[i].classList.contains("active")) {
      // Remove the inactive one, then add active
      current[0].classList.remove("active");
      currentSelect[0].classList.remove("active");
      contentSelect[0].classList.remove("active");

      contentSelect[i].classList.add("active");
      content[i].classList.add("active");
    }
  });
}

for (let i = 0; i < dropdown.length; i++) {
  // Close dropdown if click outside
  dropdownOverlay.addEventListener("click", function () {
    const current = document.getElementsByClassName("dropdown active");
    if (current.length) {
      const target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      current[0].classList.remove("active");
      dropdownOverlay.style.display = "none";
    }
  });

  // open/close dropdown when button is clicked
  dropdown[i].addEventListener("click", function () {
    const current = document.getElementsByClassName("dropdown active");
    // Close dropdown if click button when dropdown is opened
    if (this.classList.contains("active")) {
      const target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      this.classList.remove("active");
      dropdownOverlay.style.display = "none";
      return;
    }
    // Open dropdown if click button
    // If other dropdown already open, remove existing content
    if (current.length) {
      const target = current[0].querySelectorAll(".bx-chevron-down")[0];
      target.classList.add("inactive");
      current[0].classList.remove("active");
      this.classList.remove("animation");
    }
    // If other dropdown not open, add animation
    else this.classList.add("animation");
    this.classList.add("active");
    // Add overlay, grey if main nav, white if signin
    dropdownOverlay.style.display = "block";
    dropdownOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
    if (!signin.classList.contains("active"))
      dropdownOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  });
}
