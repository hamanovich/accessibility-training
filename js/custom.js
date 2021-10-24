(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

// document.querySelectorAll("#nav li").forEach(function(navEl) {
//   navEl.onclick = function() {
//     toggleTab(this.id, this.dataset.target);
//   };
// });

// function toggleTab(selectedNav, targetId) {
//   var navEls = document.querySelectorAll("#nav li");

//   navEls.forEach(function(navEl) {
//     if (navEl.id == selectedNav) {
//       navEl.classList.add("is-active");
//     } else {
//       if (navEl.classList.contains("is-active")) {
//         navEl.classList.remove("is-active");
//       }
//     }
//   });

//   var tabs = document.querySelectorAll(".tab-pane");

//   tabs.forEach(function(tab) {
//     if (tab.id == targetId) {
//       tab.style.display = "block";
//     } else {
//       tab.style.display = "none";
//     }
//   });
// }
(function () {
  var tablist = document.querySelectorAll('[role="tablist"]')[0];
  var tabs;
  var panels;
  var delay = determineDelay();

  generateArrays();

  function generateArrays() {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  }

  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
  };

  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1,
  };

  for (i = 0; i < tabs.length; ++i) {
    addListeners(i);
  }

  function addListeners(index) {
    tabs[index].addEventListener("click", clickEventListener);
    tabs[index].addEventListener("keydown", keydownEventListener);
    tabs[index].addEventListener("keyup", keyupEventListener);
    tabs[index].index = index;
  }

  function clickEventListener(event) {
    var tab = event.currentTarget;
    activateTab(tab, false);
  }

  function keydownEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        activateTab(tabs[0]);
        break;
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
  }

  function keyupEventListener(event) {
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.delete:
        determineDeletable(event);
        break;
    }
  }

  function determineOrientation(event) {
    var key = event.keyCode;
    var vertical = tablist.getAttribute("aria-orientation") == "vertical";
    var proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      }
    }

    if (proceed) {
      switchTabOnArrowPress(event);
    }
  }

  function switchTabOnArrowPress(event) {
    var pressed = event.keyCode;
    for (x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener("focus", focusEventHandler);
    }

    if (direction[pressed]) {
      const { target } = event;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        } else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        } else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        }
      }
    }
  }

  function activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    deactivateTabs();
    tab.removeAttribute("tabindex");
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    var controls = tab.getAttribute("aria-controls");
    document.getElementById(controls).removeAttribute("hidden");
    if (setFocus) {
      tab.focus();
    }
  }

  function deactivateTabs() {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute("tabindex", "-1");
      tabs[t].classList.remove("is-active");
      tabs[t].setAttribute("aria-selected", "false");
      tabs[t].removeEventListener("focus", focusEventHandler);
    }

    for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute("hidden", "hidden");
    }
  }

  function focusFirstTab() {
    tabs[0].focus();
  }

  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }

  function determineDeletable(event) {
    const { target } = event;

    if (target.getAttribute("data-deletable") !== null) {
      deleteTab(event, target);
      generateArrays();

      if (target.index - 1 < 0) {
        activateTab(tabs[0]);
      } else {
        activateTab(tabs[target.index - 1]);
      }
    }
  }

  function deleteTab(event) {
    const { target } = event;
    var panel = document.getElementById(target.getAttribute("aria-controls"));

    target.parentElement.removeChild(target);
    panel.parentElement.removeChild(panel);
  }
  function determineDelay() {
    var hasDelay = tablist.hasAttribute("data-delay");
    var delay = 0;

    if (hasDelay) {
      var delayValue = tablist.getAttribute("data-delay");
      if (delayValue) {
        delay = delayValue;
      } else {
        // If no value is specified, default to 300ms
        delay = 300;
      }
    }

    return delay;
  }

  function focusEventHandler(event) {
    const { target } = event;

    setTimeout(checkTabFocus, delay, target);
  }

  function checkTabFocus(target) {
    focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    }
  }
})();
