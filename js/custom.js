// Burger menu
(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);

  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

// Live content
(function() {
  setInterval(function() {
    document.getElementById("ariaLiveExample").textContent = new Date();
  }, 60000);
})();

// Tabs navigation
document.querySelectorAll("#navTopics button").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
  navEl.onkeydown = function(e) {
    var code = e.code;

    if (code === "Tab") {
      document.querySelectorAll("#navTopicsContent > .is-active > .container")[0].focus();
    }
  };
});

document.querySelectorAll("#navTopics")[0].onkeydown = function(e) {
  var code = e.code;
  var navElsLength = document.querySelectorAll("#navTopics button").length;
  var activeEl = document.activeElement;
  var activeElDataId = +activeEl.dataset.id || 0;

  e.preventDefault();

  if (code === "Home") {
    setTabFocus("topicNav1", "pane-1");
  }
  
  if (code === "End") {
    setTabFocus("topicNav" + navElsLength, "pane-" + navElsLength);
  }
  
  if (code === "ArrowRight") {
    if (activeEl.id === "navTopics" || activeElDataId === navElsLength) {
      setTabFocus("topicNav1");
    } else {
      setTabFocus("topicNav" + (activeElDataId + 1));
    }
  }
  
  if (code === "ArrowLeft") {
    if (activeEl.id === "navTopics" || activeElDataId === 1) {
      setTabFocus("topicNav" + navElsLength);
    } else {
      setTabFocus("topicNav" + (activeElDataId - 1));
    }
  }
  
  if (code === "Enter" || code === "Space") {
    toggleTab("topicNav" + activeElDataId, "pane-" + activeElDataId);
  }
};

function setTabFocus(selectedNav) {
  var navEl = document.querySelectorAll("#" + selectedNav)[0];

  navEl.focus();
}

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#navTopics button");
  var tabs = document.querySelectorAll(".tab-pane");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-selected", true);
    } else if (navEl.classList.contains("is-active")) {
      navEl.classList.remove("is-active");
      navEl.setAttribute("aria-selected", false);
    }
  });

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
      tab.setAttribute("hidden", false);
    } else {
      tab.style.display = "none";
      tab.setAttribute("hidden", true);
    }
  });
}
