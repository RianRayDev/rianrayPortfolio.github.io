
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
 * Scrolls to an element with header offset
 */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  /**
 * Hero type effect
 */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });
  /**
   * Portfolio
   */
  // const cardsContainer = document.querySelector('.cards');
  // const cards = document.querySelector(".cards");
  // const images = document.querySelectorAll(".card__img");
  // const backgrounds = document.querySelectorAll(".card__bg");
  // const cardNodes = document.querySelectorAll('.card');
  // const headings = document.querySelectorAll('#projects-title, #projects-subTitle');
  // const range = 40;
  // let mouseX = 0;
  // let mouseY = 0;
  // let isMouseInside = false; 

  // resetTransforms();

  // document.addEventListener("mousemove", ({ x, y }) => {
  //   mouseX = x;
  //   mouseY = y;
  //   if (isMouseInside) {
  //     updateTransforms();
  //   }
  // });

  // const myPortfolioSection = document.getElementById('myPortfolio');
  // myPortfolioSection.addEventListener('mouseenter', () => {
  //   isMouseInside = true; 
  //   cards.style.transition = "transform 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)"; 
  //   images.forEach(image => {
  //     image.style.transition = "transform 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)"; 
  //   });
  //   backgrounds.forEach(background => {
  //     background.style.transition = "background-position 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)"; 
  //   });

  //   window.addEventListener('scroll', updateTransforms);

  //   const transitionTimeout = setTimeout(() => {
  //     cards.style.transition = "none"; 
  //     images.forEach(image => {
  //       image.style.transition = "none"; 
  //     });
  //     backgrounds.forEach(background => {
  //       background.style.transition = "none"; 
  //     });
  //   }, 500);

  //   myPortfolioSection.addEventListener('mouseleave', () => {
  //     clearTimeout(transitionTimeout);
  //   });

  //   updateTransforms();
  // });

  // myPortfolioSection.addEventListener('mouseleave', () => {
  //   isMouseInside = false; 
  //   cards.style.transition = "transform 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)"; 
  //   images.forEach(image => {
  //     image.style.transition = "transform 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)";
  //   });
  //   backgrounds.forEach(background => {
  //     background.style.transition = "background-position 0.5s cubic-bezier(0.41, 0.01, 0.39, 0.99)";
  //   });
  //   resetTransforms(); 

  //   window.removeEventListener('scroll', updateTransforms);
  // });

  // function updateTransforms() {
  //   const yValue = calcValue(mouseY, window.innerHeight);
  //   const xValue = calcValue(mouseX, window.innerWidth);
  //   const parallaxFactor = 0.5;
  //   cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg) translateZ(${yValue * parallaxFactor}px)`;
  //   images.forEach(image => {
  //     image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px) translateZ(${yValue * parallaxFactor}px)`;
  //   });
  //   images.forEach(image => {
  //     image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px) translateZ(${yValue * parallaxFactor}px)`;
  //   });
  // }

  // function resetTransforms() {
  //   const defaultXValue = calcValue(window.innerWidth / 2, window.innerWidth) / 1.8;
  //   const defaultYValue = calcValue(window.innerHeight / 2, window.innerHeight) / 1.8;
  //   cards.style.transform = `rotateX(${defaultYValue}deg) rotateY(${defaultXValue}deg)`;
  //   images.forEach(image => {
  //     image.style.transform = `translateX(${-defaultXValue}px) translateY(${defaultYValue}px)`;
  //   });
  //   backgrounds.forEach(background => {
  //     background.style.backgroundPosition = `${defaultXValue * 0.45}px ${-defaultYValue * 0.45}px`;
  //   });
  // }

  // function calcValue(a, b) {
  //   return (a / b * range - range / 2).toFixed(1);
  // }
  /**
   * Google Maps
   */
  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#profile-picture", {
    scrollTrigger: {
      trigger: "#profile-picture",
      start: "top top",
      end: "bottom top -20%",
      scrub: 1,
      snap: { snapTo: "labelsDirectional", duration: 0.1 }
    },
    y: -90
  });
  document.querySelectorAll('.icon-box').forEach(box => {
    // Set initial state
    gsap.set(box.querySelector('.icon-bottom-liquid'), { y: 0, x: -110, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-html'), { y: 0, x: -65, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-css'), { y: 0, x: -20, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-javascript'), { y: 0, x: 25, opacity: 1 });
    // techstack names
    gsap.set(box.querySelector('.p-liquid'), { opacity: 0 });
    gsap.set(box.querySelector('.p-html'), { opacity: 0 });
    gsap.set(box.querySelector('.p-css'), { opacity: 0 });
    gsap.set(box.querySelector('.p-javascript'), { opacity: 0 });
    //================================//
    gsap.set(box.querySelector('.icon-bottom-nodejs'), { y: 0, x: -110, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-expressjs'), { y: 0, x: -65, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-gsap'), { y: 0, x: -20, opacity: 1 });
    // techstack names
    gsap.set(box.querySelector('.p-nodejs'), { opacity: 0 });
    gsap.set(box.querySelector('.p-expressjs'), { opacity: 0 });
    gsap.set(box.querySelector('.p-gsap'), { opacity: 0 });
    //================================//
    gsap.set(box.querySelector('.icon-bottom-jira'), { y: 0, x: -110, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-openAi'), { y: 0, x: -65, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-zoho'), { y: 0, x: -20, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-slack'), { y: 0, x: 25, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-github'), { y: 0, x: 70, opacity: 1 });
    // techstack names
    gsap.set(box.querySelector('.p-jira'), { opacity: 0 });
    gsap.set(box.querySelector('.p-openAi'), { opacity: 0 });
    gsap.set(box.querySelector('.p-zoho'), { opacity: 0 });
    gsap.set(box.querySelector('.p-slack'), { opacity: 0 });
    gsap.set(box.querySelector('.p-github'), { opacity: 0 });
    //================================//
    gsap.set(box.querySelector('.icon-bottom-illustrator'), { y: 0, x: -110, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-filmora'), { y: 0, x: -65, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-capcut'), { y: 0, x: -20, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-garageband'), { y: 0, x: 25, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-logicprox'), { y: 0, x: 70, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-flstudio'), { y: 0, x: 115, opacity: 1 });
    // techstack names
    gsap.set(box.querySelector('.p-illustrator'), { y: 0, opacity: 0 });
    gsap.set(box.querySelector('.p-filmora'), { y: 0, opacity: 0 });
    gsap.set(box.querySelector('.p-capcut'), { y: 0, opacity: 0 });
    gsap.set(box.querySelector('.p-garageband'), { y: 0, opacity: 0 });
    gsap.set(box.querySelector('.p-logicprox'), { y: 0, opacity: 0 });
    gsap.set(box.querySelector('.p-flstudio'), { y: 0, opacity: 0 });
    //================================//
    gsap.set(box.querySelector('#powerautomate'), { y: 0, scale: 1 });

    gsap.set(box.querySelector('.icon-bottom'), { y: 0, x: 0, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-2'), { y: 0, x: -50, opacity: 1 });
    gsap.set(box.querySelector('.icon-bottom-3'), { y: 0, x: -100, opacity: 1 });

    // Animation on mouse enter
    box.addEventListener('mouseenter', () => {
      gsap.to(box.querySelector('.icon-bottom-liquid'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -90, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-html'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -15, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-css'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 55, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-javascript'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 127, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-liquid'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-html'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-css'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-javascript'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-liquid'), { duration: 0.3, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-html'), { duration: 0.3, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-css'), { duration: 0.3, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-javascript'), { duration: 0.3, scale: 0.8, y: -20, opacity: 1, ease: 'power3.inOut' });
      //================================//
      gsap.to(box.querySelector('.icon-bottom-nodejs'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -80, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-expressjs'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-gsap'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 120, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-nodejs'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-expressjs'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-gsap'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-nodejs'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-expressjs'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-gsap'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      //================================//
      gsap.to(box.querySelector('.icon-bottom-jira'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -100, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-openAi'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -40, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-zoho'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-slack'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 80, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-github'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 140, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-jira'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-openAi'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-zoho'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-slack'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-github'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-jira'), { duration: 0.5, y: -20, scale: 1.2, opacity: 1, ease: 'power3.inOut', });
      gsap.to(box.querySelector('.p-openAi'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-zoho'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-slack'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-github'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      //================================//
      gsap.to(box.querySelector('.icon-bottom-illustrator'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -100, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-filmora'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -52.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-capcut'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-garageband'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 42.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-logicprox'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 90, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-flstudio'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 137.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-illustrator'), { duration: 0.5, scale: 1.1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-filmora'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-capcut'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-garageband'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-logicprox'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-flstudio'), { duration: 0.5, scale: 1.5, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-illustrator'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-filmora'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-capcut'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-garageband'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-logicprox'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.p-flstudio'), { duration: 0.5, y: -20, opacity: 1, ease: 'power3.inOut' });
      //================================//  
      gsap.to(box.querySelector('#powerautomate'), { y: -20, scale: 1.5, ease: 'power3.inOut' });

      gsap.to(box.querySelector('.icon-bottom'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: 100,
        ease: 'power3.inOut'
      });
      gsap.to(box.querySelector('.icon-bottom-2'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: 10,
        ease: 'power3.inOut'
      });
      gsap.to(box.querySelector('.icon-bottom-3'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: -80,
        ease: 'power3.inOut'
      });
    });

    // Animation on mouse leave
    box.addEventListener('mouseleave', () => {
      gsap.to(box.querySelector('.icon-bottom-liquid'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -110, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-html'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -65, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-css'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-javascript'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 25, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-liquid'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-html'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-css'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-javascript'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-liquid'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-html'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-css'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-javascript'), { duration: 0.5, y: 0, scale: 1, opacity: 0, ease: 'power3.inOut' })
      //================================//
      gsap.to(box.querySelector('.icon-bottom-nodejs'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -110, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-expressjs'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -65, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-gsap'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-nodejs'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-expressjs'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-gsap'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-nodejs'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-expressjs'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-gsap'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      //================================//
      gsap.to(box.querySelector('.icon-bottom-jira'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -110, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-openAi'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -65, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-zoho'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-slack'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 25, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-github'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 70, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-jira'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-openAi'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-zoho'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-slack'), { duration: 0.5, scale: 0.8, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-github'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-jira'), { duration: 0.5, y: 0, scale: 1, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-openAi'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-zoho'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-slack'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-github'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      //================================//
      gsap.to(box.querySelector('.icon-bottom-illustrator'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -110, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-filmora'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -65, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-capcut'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: -20, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-garageband'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 25, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-logicprox'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 70, ease: 'power3.inOut' });
      gsap.to(box.querySelector('.icon-bottom-flstudio'), { duration: 0.5, opacity: 1, scale: 1, y: 0, x: 115, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-illustrator'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-filmora'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-capcut'), { duration: 0.5, scale: 1.3, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-garageband'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-logicprox'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      gsap.to(box.querySelector('#icn-flstudio'), { duration: 0.5, scale: 1, ease: 'power3.inOut' });
      // techstack names
      gsap.to(box.querySelector('.p-illustrator'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-filmora'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-capcut'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-garageband'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-logicprox'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      gsap.to(box.querySelector('.p-flstudio'), { duration: 0.5, y: 0, opacity: 0, ease: 'power3.inOut' })
      //================================//
      gsap.to(box.querySelector('#powerautomate'), { y: 0, scale: 1, ease: 'power3.inOut' });

      gsap.to(box.querySelector('.icon-bottom'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: 0,
        ease: 'power3.inOut'
      });
      gsap.to(box.querySelector('.icon-bottom-2'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: -50,
        ease: 'power3.inOut'
      });
      gsap.to(box.querySelector('.icon-bottom-3'), {
        duration: 0.5,
        opacity: 1,
        y: 0,
        x: -100,
        ease: 'power3.inOut'
      });
    });

  });

//
// emailJS
// 
window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      // these IDs from the previous steps
      emailjs.sendForm('service_foglw4w', 'template_4a29mpk', this)
          .then(() => {
              console.log('SUCCESS!');
          }, (error) => {
              console.log('FAILED...', error);
          });
  });
}
// 
// send message
// 
document.querySelector('.send-email').addEventListener('click', function() {

  const form = document.querySelector('#contact-form'); 
  if (form.checkValidity()) {
    this.classList.add('clicked'); 
    this.textContent = 'Sent'; 

    setTimeout(() => {
      this.classList.remove('clicked');
      this.textContent = 'Send Message';
    }, 3000);
  } else {

    this.style.backgroundColor = '#ea4036'; 
    this.textContent = 'Missing Fields'; 

    setTimeout(() => {
      this.style.backgroundColor = ''; 
      this.textContent = 'Send Message';
    }, 1000);
  }
});
// 
// profile video
// 
const profileVideo = document.getElementById('profileVideo');

profileVideo.addEventListener('mouseover', () => {
  profileVideo.play();
});

profileVideo.addEventListener('mouseout', () => {
  profileVideo.pause();
});

  new PureCounter();
})();
function scrollToTop() {
  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
