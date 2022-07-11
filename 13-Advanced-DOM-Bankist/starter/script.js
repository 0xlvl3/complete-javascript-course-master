'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//used for scrollto
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

*/
