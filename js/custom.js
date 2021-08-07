(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.addEventListener('click',function(e) {
    toggleTab(e.currentTarget.id, e.currentTarget.dataset.target);
  });
  navEl.addEventListener('keydown', (e) => toggleTab(e.currentTarget.id, e.currentTarget.dataset.target));
});

document.querySelector('.dropMenu').addEventListener('keydown', openSkipToMain);
document.querySelector('.dropMenu').addEventListener('keydown', (e)=> {
  if(e.keyCode === 27) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "none";
    e.target.closest('.dropMenu').style.height = "0px";
  }
});

function openSkipToMain (e) {
  console.log(e, e.target)
  if(e.keyCode === 13 || e.keyCode === 32) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "block";
  }
}
function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute('tabindex', '0')
      navEl.addEventListener('keydown', (e) => {
        if(e.keyCode === 39) {
          console.log(navEls[(parseInt(selectedNav,10) + 1)], (parseInt(selectedNav,10)));
          navEls[(parseInt(selectedNav,10) + 1)].focus()
        } else if(e.keyCode === 37) navEls[(parseInt(selectedNav,10) - 1)].focus();
      })
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute('tabindex', '-1')

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
