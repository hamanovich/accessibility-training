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

function menuItemHandler(e) {
  const current = e.currentTarget;
  const menuItems = document.querySelectorAll(
    "#navbarMenu .navbar-item.with-menu"
  );
  menuItems.forEach((item) => {
    item.children[0].setAttribute("aria-expanded", false);
    const classes = item.querySelector(".fas").classList;
    classes.remove("fa-angle-up");
    classes.add("fa-angle-down");
    item.querySelector(".sub-menu").style.display = "none";
  });
  current.children[0].setAttribute("aria-expanded", true);
  current.querySelector(".fas").classList.add("fa-angle-up");
  current.querySelector(".sub-menu").style.display = "block";
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

  // MENU

  const menuItems = document.querySelectorAll(
    "#navbarMenu .navbar-item.with-menu"
  );
  menuItems.forEach((item) => {
    if (item.children.length > 1) {
      item.addEventListener("click", menuItemHandler);
    }
  });

  document.querySelectorAll("#navbarMenu .sub-menu").forEach((item) => {
    const validChildren = Object.values(item.children).filter(
      (ch) => ch.role !== "separator"
    );

    let menuItemFocus = 0;

    item.addEventListener("keydown", (e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
        validChildren[menuItemFocus].setAttribute("tabindex", -1);
        if (e.keyCode === 40) {
          menuItemFocus++;
          if (menuItemFocus >= validChildren.length) {
            menuItemFocus = 0;
          }
        } else if (e.keyCode === 38) {
          menuItemFocus--;
          if (menuItemFocus < 0) {
            menuItemFocus = validChildren.length - 1;
          }
        }
        validChildren[menuItemFocus].setAttribute("tabindex", 0);
        validChildren[menuItemFocus].focus();
      }
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        console.log(validChildren[menuItemFocus].firstElementChild);
        validChildren[menuItemFocus].firstElementChild.click();
      }
    });
  });
})();
