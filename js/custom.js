const constants = {
  KEY_CODE_ENTER: 13,
  KEY_CODE_SPACE: 32,
  KEY_CODE_END: 35,
  KEY_CODE_HOME: 36,
  KEY_CODE_ARROW_LEFT: 37,
  KEY_CODE_ARROW_RIGHT: 39,
};

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
      skipLink.ariaExpanded = false;
    } else {
      skipLink.classList.add("visible");
      skipLink.ariaExpanded = true;
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
  });

  const navEls = document.querySelectorAll(".tab-button");
  navEls.forEach(function(navEl) {
    if (navEl.classList.contains("is-active")) {
      navEl.ariaSelected = true;
    }
  });
})();

document.addEventListener('keydown', (event) => {
  const { keyCode } = event;

  if (keyCode === constants.KEY_CODE_END || keyCode === constants.KEY_CODE_HOME) {
    event.preventDefault();
  }
});

document.querySelectorAll(".tab-button").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };

  navEl.onkeydown = function(event) {
    const { keyCode } = event;
    const currentId = +this.id.slice(-1) - 1;

    if (keyCode === constants.KEY_CODE_ARROW_LEFT) {
      onfocusTab(this.id, currentId, true);
    }

    if (keyCode === constants.KEY_CODE_ARROW_RIGHT) {
      onfocusTab(this.id, currentId, false);
    }

    if (keyCode === constants.KEY_CODE_END) {
      onfocusEdge(true);
    }

    if (keyCode === constants.KEY_CODE_HOME) {
      onfocusEdge(false);
    }

    if (keyCode === constants.KEY_CODE_ENTER || keyCode === constants.KEY_CODE_SPACE) {
      toggleTab(this.id, this.dataset.target);
    }
  };
});

function onfocusEdge(isFocusEndElement) {
  const navEls = document.querySelectorAll(".tab-button");

  navEls[isFocusEndElement ? navEls.length - 1 : 0].focus();
};

function onfocusTab(selectedNav, id, isLeftArrow) {
  const navEls = document.querySelectorAll(".tab-button");

  if (isLeftArrow && id !== 0) {
    navEls[id - 1].focus();
  }
  if (!isLeftArrow && id !== navEls.length - 1) {
    navEls[id + 1].focus();
  }
};

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll(".tab-button");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.ariaSelected = true;
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.ariaSelected = false;
      }
    }
  });

  const tabs = document.querySelectorAll(".tab-panel");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}
