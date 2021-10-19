(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

(function () {
  var tablist = document.querySelector('[role="tablist"]');
  var tabs;
  var panels;

  generateArrays();

  function generateArrays () {
    tabs = document.querySelectorAll('[role="tab"]');
    panels = document.querySelectorAll('[role="tabpanel"]');
  };

  var keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
    enter: 13,
    space: 32
  };

  var direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  for (i = 0; i < tabs.length; ++i) {
    addListeners(i);
  };

  function addListeners (index) {
    tabs[index].addEventListener('click', clickEventListener);
    tabs[index].addEventListener('keydown', keydownEventListener);
    tabs[index].addEventListener('keyup', keyupEventListener);

    tabs[index].index = index;
  };

  function clickEventListener (event) {
    if (event.target.classList.contains('tab')) {
      activateTab(event.target, false);
    }
  };

  function keydownEventListener (event) {
    var key = event.keyCode;
    switch (key) {
      case keys.end:
        event.preventDefault();
        focusLastTab();
        break;
      case keys.home:
        event.preventDefault();
        focusFirstTab();
        break;

      case keys.left: 
      case keys.right: 
        event.preventDefault();
        break;
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    };
  };

  function keyupEventListener (event) {
    console.log(event);
    var key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
      case keys.enter:
      case keys.space:
        activateTab(event.target);
        break;
    };
  };

  function determineOrientation (event) {
    console.log(event);
    var key = event.keyCode;
    var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    var proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      };
    } else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      };
    };

    if (proceed) {
      switchTabOnArrowPress(event);
    };
  };

  function switchTabOnArrowPress (event) {
    var pressed = event.keyCode;

    if (direction[pressed]) {
      var target = event.target;
      console.log(target);
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        }
        else if (pressed === keys.right || pressed == keys.down) {
          focusFirstTab();
        };
      };
    };
  };

  function activateTab (tab, setFocus) {
    setFocus = setFocus || true;
    deactivateTabs();
    tab.removeAttribute('tabindex');

    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('is-active');

    var controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).removeAttribute('hidden');
    if (setFocus) {
      tab.focus();
    };
  };

  function deactivateTabs () {
    for (t = 0; t < tabs.length; t++) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
      if (tabs[t].classList.contains("is-active")) {
        tabs[t].classList.remove("is-active");
      }
    };

    for (p = 0; p < panels.length; p++) {
      panels[p].setAttribute('hidden', 'hidden');
    };
  };

  function focusFirstTab () {
    tabs[0].focus();
  };

  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  };
}());

const inputEl = document.getElementById('enterSomethingInput');

const message = ' something entered here'.split('');
let letterIdx = 0;

const getLetter = (letterIdx) => {
  setLetter(message[letterIdx])
};

const setLetter = (letter) => {
  inputEl.value += letter;
}

document.addEventListener('click', () => {
  const interval = setInterval(() => {
    if (letterIdx < message.length - 1) {
      getLetter(letterIdx += 1);
    } else {
      clearInterval(interval);
    }
  }, 1000)
}, { once: true })

const navBar = document.getElementById('navbarMenu');
const skipNavBtn = document.querySelector('.skip-nav-link');
const skipNavList = document.getElementById('skip-nav-list');

let isModalOpen = false;

skipNavBtn.addEventListener('click', () => {
  skipNavList.classList.toggle('display-none');
  setIsModalOpen();
});

const setIsModalOpen = () => {
  if (skipNavBtn.classList.contains('display-none')) {
    isModalOpen = false;
  } else {
    isModalOpen = true
  }
}

document.addEventListener('focusin', (event) => {
  if (event.target.className !== "skip-nav-item" && !skipNavList.classList.contains('display-none')) {
    skipNavList.classList.add('display-none');
  }
}, true);

document.addEventListener('focusout', (event) => {
  if (event.relatedTarget === null) {
    skipNavList.classList.add('display-none');
  } 
}, true);

const tabItems = document.querySelectorAll('.tab');
tabItems.forEach((tab) => tab.addEventListener('click', (e) => e.preventDefault()));

const administrationBtn = document.getElementById('administration-button');
const administrationList = document.getElementById('administration-list');
const administrationListItems = administrationList.childNodes;

const hideAdminMenu = () => {
  administrationList.setAttribute('hidden', 'hidden');
  administrationList.setAttribute('aria-expanded', 'false');
}

const showAdminMenu = () => {
  administrationList.removeAttribute('hidden');
  administrationList.setAttribute('aria-expanded', 'true');
}

administrationBtn.addEventListener('click', () => {
  if (administrationList.hasAttribute('hidden')) {
    showAdminMenu();
  } else {
    hideAdminMenu();
  }
})

administrationList.addEventListener('mouseout', (event) => {
  if (event.target.parentNode.className !== 'administration-list__item') {
    setTimeout(hideAdminMenu, 2000);
  }
}, true);

administrationListItems.forEach(el => el.addEventListener('focusout', (event) => {
  console.log(event)
  if (event.relatedTarget === null || event.relatedTarget.classList.contains('button')) {
    hideAdminMenu();
  }
}, true));

administrationList.addEventListener('blur', (event) => {
  if (event.target.parentNode.className !== 'administration-list__item') {
    hideAdminMenu();
  }
}, true);

administrationBtn.addEventListener('mouseenter', showAdminMenu);

document.addEventListener('keydown', (event) => {
  console.log(event);
  if (event.keyCode == 27) { // escape
    hideAdminMenu();
  }
})
