let state = {
    balance: 0,
    transactions: []
}

let balanceEl = document.querySelector('.amount-span');
let resultsEl = document.querySelector('.result-container');
const expenseType = document.getElementById('dropdown');
const expBtn = document.getElementById('expense-btn');
const descriptionInput = document.getElementById('description');
const valueInput = document.getElementById('value');


function init () {
    let localState = JSON.parse(localStorage.getItem('expenseTracker'));
    if(localState !== null) {
        state = localState;
    }
    updateState();
    initLisenter();
}

function initLisenter() {
    expBtn.addEventListener("click",expenseValues);
}

function getID() {
    return Math.round(Math.random() * 100000);
}

function expenseValues() {
    let nameVal = descriptionInput.value;
    let amountVal = valueInput.value; 
    if(nameVal !== '' && amountVal !== '') {
        const transaction = {
            id: getID(),
            name: descriptionInput.value,
            amount: parseInt(valueInput.value),
            type: expenseType.value
        };
        state.transactions.push(transaction);
        updateState();
    }
    else {
        alert("Please Enter valid data");
    }
    descriptionInput.value = '';
    valueInput.value = '';
}


function updateState () {
    let balance = 0,item;
    for(let i=0;i<state.transactions.length;i++) {
        item = state.transactions[i];
        if(item.type === "Savings") {
            balance += item.amount;
        } else if (item.type === "Expense") {
            balance -= item.amount;
        }
    }
    state.balance = balance;
    localStorage.setItem('expenseTracker',JSON.stringify(state));
    render();
}

function render () {
    balanceEl.innerHTML = state.balance;
    let resultEl;
    resultsEl.innerHTML = '';
    for(let i=0;i<state.transactions.length;i++) {
        resultEl = document.createElement('div');
        resultEl.classList.add('result');
        const currentDate = document.createElement('p');
        const des = document.createElement('p');
        const val = document.createElement('p');
        const trash = document.createElement('button');
        trash.classList.add('trash-btn');
        currentDate.innerHTML = `<p>${getDate()}</p>`;
        des.innerHTML = `<p>${state.transactions[i].name}</p>`;
        val.innerHTML = `<p>${state.transactions[i].amount}</p>`;
        trash.innerHTML = `<i class="fa fa-trash" data-id=${state.transactions[i].id}></i>`;
        trash.addEventListener("click",deleteExpense);
        resultEl.append(currentDate,des,val,trash);
        resultsEl.appendChild(resultEl);
    } 
}

function deleteExpense(event) {
    let idEl = event.target.getAttribute('data-id');
    let delIndex;
    for(let i = 0;i<state.transactions.length;i++) {
        if(state.transactions[i].id == idEl) {
            delIndex = i;
            break;
        }
    }  
    state.transactions.splice(delIndex,1);
    updateState();
}

/* To get MONTH AND YEAR BELOW "YOUR BALANCE" */
let mon = () => {
    var today = new Date();
    var options = {
  	month: "long", 
  	year: "numeric"
}
var sDay = today.toLocaleDateString("en-US", options);
return sDay;
}
date.innerText = `${mon()}`;
/* ---- */
/* To append date in result div */
const getDate = () => {
    const date = new Date();
    const n = date.toDateString();
    return n;
}
/* To get expense value near "Tracking" */
function selectVal() {
    let etypeEl = document.getElementById('etype');
    if(expenseType.value == "Savings") {
        etypeEl.innerHTML = `
            <p>Tracking ${expenseType.value} <i class="fa fa-bank"></i></p>
        `; 
    }
    else if(expenseType.value == "Expense") {
        etypeEl.innerHTML = `
        <p>Tracking ${expenseType.value} <i class="fa fa-money"></i></p>
        `;
    }
    else
        alert("Please choose Expense type");
}
/* ----- */
init();