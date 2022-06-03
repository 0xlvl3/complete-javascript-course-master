'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//querySelector will only select the first element of a class
const btnsOpenModal = document.querySelectorAll('.show-modal'); //querySelectorAll will select all elements of the class

//will readd hidden class and remove overlay
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//looping through all elements of the .show-modal class
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//on our click event we add a function but we don't use closeModal()
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//using eventlistener to listen for keydown of escape and close the modal when we press esc
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
