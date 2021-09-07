(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function(e) {
    e.preventDefault();
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active");
      navEl.children[0].setAttribute("aria-selected", "true");
      navEl.children[0].setAttribute("aria-hidden", "false");
    } else {
      if (navEl.children[0].getAttribute("aria-selected")) {
        navEl.classList.remove("is-active");
        navEl.children[0].setAttribute("aria-selected", "false");
        navEl.children[0].setAttribute("aria-hidden", "true");
      }
    }
  });

  const tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id === targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

//# sourceMappingURL=custom.js.map