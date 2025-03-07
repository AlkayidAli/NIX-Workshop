const initializeHeader = () => {
  const navToggle = document.getElementById("nav-toggle");
  const navContent = document.getElementById("nav-content");

  if (navToggle && navContent) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      navContent.classList.toggle("active");
      navToggle.classList.toggle("active");
      console.log("Toggle clicked");
    });
  } else {
    console.log("Elements not found", {
      navToggle: !!navToggle,
      navContent: !!navContent,
    });
  }
};

document.addEventListener("componentLoaded", (event) => {
  if (event.detail === "header") {
    initializeHeader();
  }
});
