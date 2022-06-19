const showMenu = (toggleID, navID) => {
  const toggle = document.getElementById(toggleID);
  const nav = document.getElementById(navID);
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

// remove menu mobile
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((link) => link.addEventListener("click", linkAction));

// scroll sections
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;
  // const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    let sectionHeight = section.offsetHeight;
    let sectionTop = section.offsetTop - 50;
    let sectionID = section.getAttribute("id");

    try {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(`.nav__menu a[href*=${sectionID}]`)
          ?.classList.add("active-link");
      } else {
        document
          .querySelector(`.nav__menu a[href*=${sectionID}]`)
          ?.classList.remove("active-link");
      }
    } catch (error) {
      console.log(error);
    }
  });
}

window.addEventListener("scroll", scrollActive);

// scrollTop
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 500) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

// dark theme
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// reduce size to print on a a4 sheet

function sclaeCV() {
  document.body.classList.add("scale-cv");
}

// remove the size when cv is downloaded

function removeScale() {
  document.body.classList.remove("scale-cv");
}

// generate PDF
let areaCV = document.getElementById("area-cv");
let resumeButton = document.getElementById("resume-button");

function generateResume() {
  html2pdf(areaCV);
}

resumeButton.addEventListener("click", () => {
  sclaeCV();
  generateResume();
  setTimeout(() => {
    removeScale();
  }, 2000);
});
