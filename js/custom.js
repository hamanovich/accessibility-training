(function() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  const skipLink = document.getElementById("skipLink");
  const skipButtonMenu = document.getElementById("skipButtonMenu");

  skipLink.addEventListener("click", function() {
    if (skipLink.className.includes("visible")) {
      skipLink.classList.remove("visible");
    } else {
      skipLink.classList.add("visible");
    }

    if (skipButtonMenu.className.includes("visible")) {
      skipButtonMenu.classList.remove("visible");
    } else {
      skipButtonMenu.classList.add("visible");
    }
  });

  skipButtonMenu.addEventListener("click", function() {
    skipLink.classList.remove("visible");
    skipButtonMenu.classList.remove("visible");
  })
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  const tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}
