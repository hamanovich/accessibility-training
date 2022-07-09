function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll("#nav li a");
  navEls.forEach(function (navEl) {
    const id = navEl.dataset.id;
    if (id === selectedNav) {
      navEl.parentElement.classList.add("is-active");
      navEl.setAttribute("aria-selected", "true");
    } else {
      if (navEl.parentElement.classList.contains("is-active")) {
        navEl.parentElement.classList.remove("is-active");
        navEl.setAttribute("aria-selected", "false");
      }
    }
  });

  const tabs = document.querySelectorAll(".tab-pane");
  tabs.forEach(function (tab) {
    tab.style.display = tab.id === targetId ? "block" : "none";
  });
}

(function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });

  let notificationCount = 0;
  const region = document.getElementById("notification");
  setInterval(() => {
    notificationCount += 1;
    region.innerText = `Notification count ${notificationCount}`;
  }, 60000);

  document.querySelectorAll("#nav li a").forEach(function (navEl) {
    navEl.onclick = function () {
      toggleTab(this.dataset.id, this.dataset.target);
    };
  });

  const items = document.querySelectorAll("#nav li a");
  items.forEach(function (navEl) {
    navEl.addEventListener("keydown", function (event) {
      const num = Number(event.target.dataset.id);
      if (event.keyCode === 39) {
        event.preventDefault();
        console.log(num);
        if (items[num]) {
          items[num].click();
        }
      } else if (event.keyCode === 37) {
        event.preventDefault();
        if (items[num - 2]) {
          items[num - 2].click();
        }
      } else if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        items[num - 1].click();
      }
    });
  });
})();
