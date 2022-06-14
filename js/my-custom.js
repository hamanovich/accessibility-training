window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const tabList = document.querySelector('[role="tablist"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  });

  let tabFocus = 0;

  tabList.addEventListener("keydown", (event) => {
    if (event.keyCode === 39 || event.keyCode === 37) {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (event.keyCode === 39) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (event.keyCode === 37) {
        tabFocus--;
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }
      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  });
});

function changeTabs(event) {
  const target = event.currentTarget;
  const tabList = target.parentNode;
  const tabContent = document.querySelector(".tab-content");

  tabList.querySelectorAll('[aria-selected="true"]').forEach((tab) => {
    tab.setAttribute("aria-selected", false);
    tab.classList.remove("is-active");
  });

  target.setAttribute("aria-selected", true);
  target.classList.add("is-active");

  tabContent.querySelectorAll('[role="tabpanel"]').forEach((tc) => {
    tc.classList.remove("is-active");
    tc.setAttribute("aria-hidden", true);
  });

  const targetTabContent = tabContent.querySelector(
    `#${target.getAttribute("aria-controls")}`
  );
  targetTabContent.classList.add("is-active");
  targetTabContent.setAttribute("aria-hidden", false);
}
