let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const primaryHeader = document.querySelector('#primary-header')
const scrollWatcher = document.createElement('nav');

scrollWatcher.setAttribute('data-scroll-watcher','');
primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
    console.log(entries)
    primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting)
});

const navObserver.observe(scrollWatcher)