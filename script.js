'use strict';
const form = document.querySelector('.form');
const billAmountEl = document.getElementById('form-row-bill-amount');
const userAmountEl = document.getElementById('form-row-user-cash');
const billAmountValue = document.getElementById('bill-amount');
const userAmountValue = document.getElementById('user-amount');

const denominations = [2000, 500, 100, 20, 10, 5, 1];

function displayError(code = -1) {
  if (code === 0) {
    billAmountValue.classList.add('error');
  } else if (code === 1) {
    userAmountValue.classList.add('error');
  } else {
    billAmountValue.classList.remove('error');
    userAmountValue.classList.remove('error');
  }
}

function billAmountValidator(e) {
  const value = e.target.value;
  if (value <= 0 || value === '') {
    displayError(0);
    userAmountValue.disabled = true;
    userAmountValue.placeholder = 'Enter a valid bill amount first';
    return;
  }

  displayError(-1);
  userAmountValue.disabled = false;
  userAmountValue.placeholder = '';
}

function calculateChange(e) {
  e.preventDefault();
  const billAmount = Number(billAmountValue.value);
  const userAmount = Number(userAmountValue.value);

  console.log(billAmount, userAmount);

  let balance = userAmount - billAmount;

  const notes = denominations.map((note) => {
    const numNotes = Math.floor(balance / note);
    if (numNotes > 0) balance = Math.floor(balance % note);
    return numNotes;
  });
  console.log(notes);
}

// Event Listeners
billAmountValue.addEventListener('input', billAmountValidator);
form.addEventListener('submit', calculateChange);

//Init
userAmountValue.disabled = true;
userAmountValue.placeholder = 'Enter a valid bill amount first';
