function changeTabs(e) {
  e.stopPropagation();
  const target = e.currentTarget;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;
  grandparent.querySelectorAll('[aria-selected="true"]').forEach((t) => {
    t.setAttribute("aria-selected", false);
    t.classList.remove("is-active");
  });

  // Set this tab as selected
  target.setAttribute("aria-selected", true);
  target.classList.add("is-active");

  const tabs = document.querySelectorAll(".tab-pane");
  tabs.forEach(function (tab) {
    tab.style.display =
      tab.id === e.currentTarget.dataset.target ? "block" : "none";
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

  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  });
  let tabFocus = 0;

  tabList.addEventListener("keydown", (e) => {
    if (e.keyCode === 39 || e.keyCode === 37) {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (e.keyCode === 39) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (e.keyCode === 37) {
        tabFocus--;
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }
      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
      tabs[tabFocus].click();
    }
  });
})();
