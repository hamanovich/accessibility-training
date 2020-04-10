(function () {
  const interval = setInterval(updateMinutesCounter, 60000);
})();

const keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
  enter: 13,
  space: 32,
};

const direction = {
  37: -1,
  38: -1,
  39: 1,
  40: 1,
};

const tabs = document.querySelectorAll("#nav li");

const firstTab = getTabFromEl(tabs[0]);
const lastTab = getTabFromEl(tabs[tabs.length - 1]);

tabs.forEach(function (navEl, index) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };

  navEl.addEventListener("keydown", (e) => {
    handleKeyboardBtnPressed(e, index);
  });
});

function handleKeyboardBtnPressed(e, index) {
  event.preventDefault();

  const key = e.keyCode;

  switch (key) {
    case keys.end:
      lastTab.focus();
      break;
    case keys.home:
      firstTab.focus();
      break;
    case keys.up:
    case keys.down:
    case keys.right:
    case keys.left:
      if (direction[key]) {
        let newIndex = index + direction[key];

        if (!tabs[newIndex]) {
          newIndex = newIndex < 0 ? tabs.length - 1 : 0;
        }

        const newTab = getTabFromEl(tabs[newIndex]);

        newTab.focus();
      }
      break;
    case keys.enter:
    case keys.space:
      const targetTab = tabs[index];
      toggleTab(targetTab.id, targetTab.dataset.target);
      break;
    default:
      break;
  }
}

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      const newTab = getTabFromEl(navEl);
      navEl.classList.add("is-active");
      newTab.setAttribute("aria-selected", "true");
      newTab.removeAttribute("tabindex");
      newTab.focus();
    } else {
      if (navEl.classList.contains("is-active")) {
        const oldTab = getTabFromEl(navEl);
        navEl.classList.remove("is-active");
        oldTab.setAttribute("aria-selected", "false");
        oldTab.setAttribute("tabindex", "-1");
      }
    }
  });

  const tabPanels = document.querySelectorAll(".tab-pane");

  tabPanels.forEach(function (tabPanel) {
    if (tabPanel.id == targetId) {
      tabPanel.style.display = "block";
    } else {
      tabPanel.style.display = "none";
    }
  });
}

function updateMinutesCounter() {
  const counter = document.getElementById("minutesCounter");
  counter.innerText = +counter.innerText + 1;
}

function getTabFromEl(el) {
  return el.getElementsByClassName("tab")[0];
}
