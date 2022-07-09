'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//lecture notes
/*

*/

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
