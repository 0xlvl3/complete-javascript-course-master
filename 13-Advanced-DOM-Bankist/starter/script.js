'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Scroll to
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Tabbed Components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

//SLIDER
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length; //nodelists you can read length property

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})`));
//0, 100%, 200%, 300%

// slider.style.transform = 'scale(0.2) translateX(-1200px)';
// slider.style.overflow = 'visible';

function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
};

//Next slide
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//using arrow keys to cycle through
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

//dots below cycle
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//LAZY LOADING IMAGES
const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  //guard
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imageTargets.forEach(img => imgObserver.observe(img));

//REVEAL SECTIONS
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObs.observe(section);
  // section.classList.add('section--hidden');
});

//GET HEIGHT OF THE NAV BAR
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

//creating an intersection observer using stickyNav function
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//STICKY NAVIGATION USING SCROLL - not good for performance
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function () {
  // console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//bind creates a new function that when called has it's this keyword set to the provided value, with a given sequence of arguments preceding any provided whent he new function is called.
nav.addEventListener('mouseover', handleHover.bind(0.5));
//passing "argument" into handler
nav.addEventListener('mouseout', handleHover.bind(1));

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});
//below is same as above, nodelists can use .forEach()
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

////////////////////////////////////////////////////////////////////////////
//////////////////////PAGE NAVIGATOR

//function to scrollto -> learn more -> section1
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//not good practice
// tabs.forEach(function (e) {
//   e.addEventListener('click', function (e) {
//     console.log('tab');
//   });
// });

//TAB COMPONENT
//whole idea is to add and remove class to manipulate content to our need
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  //finds the closest parent with class name specified
  const clicked = e.target.closest('.operations__tab');

  //guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

//not using event deligation, this would be fine for this application but if we had more events it would impact performance because every event here creates a new copy of this function
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //will prevent anchor # so we can then use scrollIntoView

//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); //common technique for using scrollIntoView
//   });
// });

//SAME AS ABOVE BUT USING EVENT DELIGATION
//
//1. Add event listener to common parent element
//2. Determine what element originated the event
//
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target); //see where the event is happening

  //Matching strategy
  //Will only fire when class is === nav__link
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//lecture notes
/*

//SELECTING ELEMENTS
//selecting the document element
console.log(document.documentElement);

//selecting the head
console.log(document.head);

//selecting the body
console.log(document.body);

//selecting the header class
const documentHeader = document.querySelector('.header');
console.log(documentHeader);

//querySelectorAll returns a nodelist
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//selecting a id, does not need a selector
const section1 = document.getElementById('section--1');
console.log(section1);

//returns an HTMLCollection, which updates automatically, does not need a selector
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//similar to the above returns HTMLCollection, does not need a selector
const lookBtn = document.getElementsByClassName(`btn`);
console.log(lookBtn);

//CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML - useful

const message = document.createElement('div');
console.log(message);
message.classList.add(`cookie-message`);
// message.textContent = `We use cookies for improved functionality and analytics`;
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

// documentHeader.prepend(message); //at top of the header
documentHeader.append(message); //at the bottom header
// documentHeader.append(message.cloneNode(true));

// documentHeader.before(message);
// documentHeader.after(message);

//DELETE ELEMENTS
//
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); - all way of doing it pre-ES6
  });

//STYLES
//these will be set as in-line styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
//we will only be able to see in-line styles in the console, height here won't work, but backgroundColor since it's now an in-line style will return in the console.
console.log(message.style.height);
console.log(message.style.backgroundColor);

//getComputedStyle will return the actual style that is on the page
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//influencing the style height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

//setting the root(document) --color-primary to orangered through js
document.documentElement.style.setProperty('--color-primary', 'orangered');

//ATTRIBUTES
//src, alt, class, id

//seeing what is attached to class attributes
const logo = document.querySelector('.nav__logo');
//shows value attached to class.attribute
console.log(logo.alt);
console.log(logo.src);
//returns class name
console.log(logo.className);

//setting attributes
logo.alt = 'Beautiful minialist logo';
console.log(logo.alt);

//getting attribute
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('src'));

//setting attriubte
logo.setAttribute('company', 'Bankist');
console.log(logo.company);

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data attriubtes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'j', 's');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

//don't use this, will overwrite all exisiting classes
logo.className ='jonas'

//SCROLLTO notes
btnScrollTo.addEventListener('click', function (e) {
  //s1coords will return a DOMRect in console
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  //currently how much user has scrolled
  console.log(e.target.getBoundingClientRect());
  console.log('Current scoll (X/Y)', window.pageXOffset, window.pageYOffset);

  //viewport of current document
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //OLD SCHOOL WAY OF DOING IT
  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //placing sscrollTo into a object, so we can use the behavior attribute
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //MODERN WAY OF DOING SCROLLING
  section1.scrollIntoView({ behavior: 'smooth' });

  //EVENT LISTENERS
//the reason why add is better than on is because we can have multiple eventListeners on the same property and we can also remove event listeners
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventLister: Great! You are reading the heading :D');

  //will remove event listener disabling our alert doesn't have to be in our function can be outside
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//example of removing event listener with timeout

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//mouseenter - will fire an event everytime the mouse enters the specified area
h1.addEventListener('mouseenter', function (e) {
  // console.log('addEventLister: Great! You are reading the heading :D');
});
//Can also listen for events with on**** - this is the old school way more commonly used is the above
// h1.onmouseenter = function (e) {
//   console.log('addEventLister: Great! You are reading the heading :D');
// };
});

//EVENT PROPRAGTION
//bubbling example

//rgb(255, 255, 255)
//to get a random colour, min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log(`LINK`);
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //e.target will show where the event has happened, e.currentTarget will point to where the this keyword points too.
  
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(`CONTAINER`);
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log(`NAV`);
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});

//EVENT PROPRAGTION
//bubbling example

//rgb(255, 255, 255)
//to get a random colour, min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log(`LINK`);
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget); //e.target will show where the event has happened, e.currentTarget will point to where the this keyword points too.

  e.stopPropagation(); //will stop the event from traveling to parent elements, this is not good practice - not used often.
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(`CONTAINER`);
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  console.log(`NAV`);
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});


//DOM TRAVERSING
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //returns a NodeList
console.log(h1.childNodes); //returns a NodeList of all child elements
console.log(h1.children); //returns HTMLCollection which is live, only works for direct childern
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = 'white';
console.log(h1.lastElementChild);
h1.lastElementChild.style.color = 'red';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //closest will be used for event deligation, here we influence the background
//closest is the opposite of querySelector finding parents
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

//BETTER THAN SCROLL
//Intersection Observer API

//observe when the target comes into view
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  //root: element that target element intercepts
  root: null,
  //percentage of interception that the callback is called, 0.1 === 10%
  //array here will call when target is 0 === completely out of view and when it's at 20%
  threshold: [0, 0.2],
};

//use observer to observe a specific target
const observer = new IntersectionObserver(obsCallback, obsOptions);
console.log(observer.observe(section1));
//EXAMPLE ABOVE


*/
