'use strict';
const form = document.querySelector('.form');
const billAmountEl = document.getElementById('form-row-bill-amount');
const userAmountEl = document.getElementById('form-row-user-cash');
const billAmountValue = document.getElementById('bill-amount');
const userAmountValue = document.getElementById('user-amount');

const balanceEl = document.getElementById('output-balance-value');
const outputTableEl = [
  ...document.querySelectorAll('.app-output-change td:not(:nth-child(1))'),
];

const denominations = [2000, 500, 100, 20, 10, 5, 1];

function clearOutputFields() {
  outputTableEl.forEach((cell) => (cell.innerText = '-'));
  balanceEl.innerText = '0';
}

function displayError(code = -1) {
  function returnErrorHTML(message) {
    return `<small class="error-message">${message}</small>`;
  }

  if (code === 0) {
    if (!billAmountValue.classList.contains('error'))
      billAmountEl.insertAdjacentHTML(
        'beforeend',
        returnErrorHTML('Bill Amount must be greater than 0')
      );

    billAmountValue.classList.add('error');
  } else if (code === 1) {
    if (!userAmountValue.classList.contains('error'))
      userAmountEl.insertAdjacentHTML(
        'beforeend',
        returnErrorHTML('Cash Received must be greater than bill amount')
      );

    userAmountValue.classList.add('error');
  } else {
    const errorEls = [...document.querySelectorAll('.error-message')];
    errorEls.forEach((el) => el.remove());
    billAmountValue.classList.remove('error');
    userAmountValue.classList.remove('error');
  }
}

function billAmountValidator() {
  // clear previous change info
  clearOutputFields();

  const value = Number(billAmountValue.value);
  if (value <= 0 || value === '') {
    displayError(0);
    userAmountValue.disabled = true;
    userAmountValue.placeholder = 'Enter bill amount first';
    return false;
  }

  displayError(-1);
  userAmountValue.disabled = false;
  userAmountValue.placeholder = '';
  return true;
}

function inputAmountValidator() {
  // clear previous change info
  clearOutputFields();

  const value = Number(userAmountValue.value);
  if (value <= Number(billAmountValue.value)) {
    displayError(1);
    return false;
  }
  displayError(-1);
  return true;
}

function calculateChange(e) {
  e.preventDefault();

  // Guard clause to prevent change calculation for incorrect inputs
  if (!billAmountValidator() || !inputAmountValidator()) return;

  const billAmount = Number(billAmountValue.value);
  const userAmount = Number(userAmountValue.value);

  let balance = userAmount - billAmount;
  balanceEl.innerText = balance;

  const notes = denominations.map((note) => {
    const numNotes = Math.floor(balance / note);
    if (numNotes > 0) balance = Math.floor(balance % note);
    return numNotes > 0 ? numNotes : '-';
  });

  notes.reverse().forEach((note, i) => {
    outputTableEl[i].innerText = note;
  });
}

// Event Listeners
billAmountValue.addEventListener('input', billAmountValidator);
userAmountValue.addEventListener('input', inputAmountValidator);
form.addEventListener('submit', calculateChange);

//Init
userAmountValue.disabled = true;
userAmountValue.placeholder = 'Enter bill amount first';
console.log(outputTableEl);
