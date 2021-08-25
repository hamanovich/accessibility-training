(function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

const live = document.getElementById("live");

setInterval(
  () => (live.innerText = "Current number: " + Math.floor(Math.random() * 100)),
  10000
);

function initTabs() {
  const tabList = document.querySelector("[role=tablist]");
  const tabs = document.querySelectorAll("[role=tab]");
  const tabPanels = document.querySelectorAll("[role=tabpanel]");
  const limit = tabs.length - 1;

  let index = 0;

  function switchTab(event) {
    const tab = event.currentTarget;
    if (!tab.classList.contains("is-active")) {
      const prevTab = tabList.querySelector(".is-active");
      prevTab.classList.remove("is-active");
      prevTab.ariaSelected = false;
      prevTab.tabIndex = -1;
      tab.classList.add("is-active");
      tab.ariaSelected = true;
      tab.tabIndex = 0;
      index = parseInt(tab.getAttribute("aria-controls").slice(-1)) - 1;
      tabPanels.forEach((panel) => {
        if (panel.classList.contains("is-active")) {
          panel.classList.remove("is-active");
          panel.tabIndex = -1;
        }
        if (panel.id === tab.attributes.getNamedItem("aria-controls").value) {
          panel.classList.add("is-active");
          panel.tabIndex = 0;
        }
      });
    }
  }

  function handleKey(event) {
    switch (event.code) {
      case "ArrowRight":
        event.preventDefault();
        if (index < limit) {
          index += 1;
          tabs.item(index).focus();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (index >= 0) {
          index -= 1;
          tabs.item(index).focus();
        }
        break;
      default:
        break;
    }
  }

  tabList.addEventListener("keydown", handleKey);
  tabs.forEach((tab) => tab.addEventListener("click", switchTab));
}

initTabs();
