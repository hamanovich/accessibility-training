function initSkipNavigationMenu() {
  const VISUALLY_HIDDEN = "visually-hidden";
  const IS_ACTIVE = "is-active";

  const dropdown = document.getElementById("skip-to-dropdown");
  const button = document.getElementById("skip-to-button");
  const menu = document.getElementById("skip-to-menu");
  const items = menu.querySelectorAll("a");
  const maxIndex = items.length - 1;

  let index = -1;

  function openMenu() {
    dropdown.classList.add(IS_ACTIVE);
    button.ariaExpanded = "true";
    items.item(0).focus();
  }

  function closeMenu() {
    index = -1;
    dropdown.classList.remove(IS_ACTIVE);
    button.ariaExpanded = "false";
  }

  function toggleMenu() {
    if (dropdown.classList.contains(IS_ACTIVE)) return closeMenu();
    return openMenu();
  }

  function handleBlur(event) {
    if (!dropdown.contains(event.relatedTarget)) hideDropdown();
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
          index -= 1;
          items.item(index).focus();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (event.target === button) {
          openMenu();
        }
        if (index < maxIndex) {
          index += 1;
          items.item(index).focus();
        }
        break;
      case "Space":
        if (menu.contains(event.target)) {
          hideDropdown();
        }
        break;
      case "Escape":
        button.focus();
        closeMenu();
        break;
      default:
        break;
    }
  }

  function showDropdown() {
    dropdown.classList.remove(VISUALLY_HIDDEN);
    dropdown.addEventListener("focusout", handleBlur);
    dropdown.addEventListener("keydown", handleKeydown);
    button.addEventListener("click", toggleMenu);
  }

  function hideDropdown() {
    closeMenu();
    dropdown.classList.add(VISUALLY_HIDDEN);
    dropdown.removeEventListener("focusout", handleBlur);
    dropdown.removeEventListener("keydown", handleKeydown);
    button.removeEventListener("click", toggleMenu);
  }

  dropdown.addEventListener("focusin", showDropdown);
}

initSkipNavigationMenu();
