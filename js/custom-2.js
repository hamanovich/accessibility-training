document.querySelectorAll("#administrationButton")[0].onclick = function(e) {
  showHideMenu(e);
};

document.querySelectorAll("#administrationButton")[0].onkeydown = function(e) {
  var code = e.code;
  var shiftKey = e.shiftKey;

  e.preventDefault();
  
  if (code === "Enter" || code === "Space") {
    showHideMenu(e);
  }

  if (code === "Tab" && !shiftKey) {
    document.querySelectorAll("#documentationLink")[0].focus();
    hideMenu();
  }

  if (code === "Tab" && shiftKey) {
    document.querySelectorAll("#homeLink")[0].focus();
    hideMenu();
  }
};

document.querySelectorAll("#administrationMenu a").forEach(function(navEl) {
  navEl.onkeydown = function(e) {
    var button = document.querySelectorAll("#administrationButton")[0];
    var linksLength = document.querySelectorAll("#administrationMenu a").length;
    var activeElDataId = +this.dataset.index || 0;
    var code = e.code;
    var shiftKey = e.shiftKey;

    e.preventDefault();

    if (code === "Tab" && !shiftKey) {
      document.querySelectorAll("#documentationLink")[0].focus();
      hideMenu();
    }
  
    if (code === "Tab" && shiftKey) {
      document.querySelectorAll("#homeLink")[0].focus();
      hideMenu();
    }

    if (code === "Escape") {
      hideMenu();
      button.focus();
    }

    if (code === "Enter" || code === "Space") {
      window.location.assign(this.href);
    }

    if (code === "Home") {
      setTabFocus("administrationMenu1");
    }
    
    if (code === "End") {
      setTabFocus("administrationMenu" + linksLength);
    }

    if (code === "ArrowUp") {
      if (this.id === "administrationMenu1") {
        setTabFocus("administrationMenu" + linksLength);
      } else {
        setTabFocus("administrationMenu" + (activeElDataId - 1));
      }
    }

    if (code === "ArrowDown") {
      if (this.id === "administrationMenu" + linksLength) {
        setTabFocus("administrationMenu1");
      } else {
        setTabFocus("administrationMenu" + (activeElDataId + 1));
      }
    }
  };
});

function showHideMenu() {
  var menu = document.querySelectorAll("#administrationMenu")[0];

  if (menu.style.display === "block") {
    hideMenu();
  } else {
    showMenu();
    setTabFocus("administrationMenu1");
  }
}

function showMenu() {
  var menu = document.querySelectorAll("#administrationMenu")[0];
  var button = document.querySelectorAll("#administrationButton")[0];

  button.setAttribute("aria-expanded", true);
  menu.style.display = "block";
  menu.style.opacity = "1";
  menu.style.pointerEvents = "auto";
  menu.setAttribute("hidden", false);
}

function hideMenu() {
  var menu = document.querySelectorAll("#administrationMenu")[0];
  var button = document.querySelectorAll("#administrationButton")[0];

  button.setAttribute("aria-expanded", false);
  menu.style.display = "none";
  menu.style.opacity = "0";
  menu.style.pointerEvents = "none";
  menu.setAttribute("hidden", true);
}

function setTabFocus(selectedNav) {
  var navEl = document.querySelectorAll("#" + selectedNav)[0];

  navEl.focus();
}
