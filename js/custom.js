(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

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
  
})

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
  console.log(event)
  if (event.target.className !== "skip-nav-item") {
    skipNavList.classList.add('display-none');
    setIsModalOpen();
  }
}, true);

document.addEventListener("keydown", function(event) {
  if (isModalOpen && event.keyCode == 27) {
    skipNavList.classList.add('display-none');
    setIsModalOpen();
  }
}, true);
