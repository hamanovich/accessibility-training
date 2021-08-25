function initAdminNavigationMenu() {
  const IS_ACTIVE = "is-active";

  const dropdown = document.getElementById("admin-dropdown");
  const button = document.getElementById("admin-button");
  const menu = document.getElementById("admin-menu");
  const items = menu.querySelectorAll("a");
  const maxIndex = items.length - 1;

  let index = -1;

  function openMenu() {
    dropdown.classList.add(IS_ACTIVE);
    dropdown.ariaExpanded = true;
  }

  function closeMenu({ focusButton }) {
    index = -1;
    items.forEach((item) => {
      item.tabIndex = -1;
    });
    dropdown.classList.remove(IS_ACTIVE);
    button.ariaExpanded = "false";
    if (focusButton) button.focus();
  }

  function handleClick(event) {
    const target = event.target;
    if (button.contains(target)) {
      return dropdown.classList.contains(IS_ACTIVE)
        ? closeMenu({ focusButton: true })
        : openMenu();
    }
    if (target.nodeName === "A") {
      closeMenu({ focusButton: false });
    }
  }

  function cycleList(direction) {
    const prevItem = items.item(index);
    index += Math.sign(direction);
    const curItem = items.item(index);
    if (prevItem) prevItem.tabIndex = -1;
    curItem.tabIndex = 0;
    curItem.focus();
  }

  function handleKeydown(event) {
    switch (event.code) {
      case "ArrowUp":
        event.preventDefault();
        if (event.target === button) {
          openMenu();
          index = maxIndex + 1;
        }
        if (index > 0) {
          cycleList(-1);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (event.target === button) {
          openMenu();
        }
        if (index < maxIndex) {
          cycleList(1);
        }
        break;
      case "Space":
        event.preventDefault();
        if (event.target.nodeName === "A") {
          event.target.click();
        }
        break;
      case "Escape":
        closeMenu({ focusButton: true });
        break;
      default:
        break;
    }
  }

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      closeMenu({ focusButton: false });
    }
  });
  dropdown.addEventListener("click", handleClick);
  dropdown.addEventListener("keydown", handleKeydown);
}

initAdminNavigationMenu();
