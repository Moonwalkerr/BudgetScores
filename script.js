// firebase Key
const firebaseConfig = {
  apiKey: "AIzaSyBRfd244wcEVP9vKsW-zRXrR_99s2Hv5oM",
  authDomain: "budgetscores-d10c5.firebaseapp.com",
  projectId: "budgetscores-d10c5",
  storageBucket: "budgetscores-d10c5.appspot.com",
  messagingSenderId: "575384564584",
  appId: "1:575384564584:web:c4153e6dacb9a5a48c1cdd",
};
// Initializing Firebase
firebase.initializeApp(firebaseConfig);

const item_name_input = document.querySelector("#item_name");
const amount_spent_input = document.querySelector("#amount_spent");
const addButton = document.querySelector("#add_btn");
const total_expenses = document.querySelector("#total_expenses");
const resetBtn = document.querySelector("#reset_btn");
const ul = document.querySelector(".expense_list");
const logout = document.querySelector("#logout");

const expenseArray = [];

let totalExpenses = 0;

// Adding Expense Button
addButton.addEventListener("click", () => {
  let amountSpent = parseInt(amount_spent_input.value, 10);
  totalExpenses += amountSpent;
  total_expenses.innerHTML = totalExpenses;
  expenseArray.push({
    item: item_name_input.value,
    amountSpent: amountSpent,
  });

  item_name_input.value = "";
  amount_spent_input.value = "";

  ul.innerHTML = "";
  expenseArray.forEach((exp) => {
    const list_item = document.createTextNode(exp.item);
    const list_amount = document.createTextNode(exp.amountSpent);

    const span = document.createElement("span");
    span.classList.add("list-amount");
    span.appendChild(list_amount);

    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(list_item);
    li.appendChild(span);
    ul.appendChild(li);
  });
});

// Reset Button
resetBtn.addEventListener("click", () => {
  expenseArray.length = 0;
  console.log(expenseArray);
  ul.innerHTML = "";
  total_expenses.innerHTML = "0";
  item_name_input.value = "";
  amount_spent_input.value = "";
});

const auth = firebase.auth();
// Logout event listener
logout.addEventListener("click", () => {
  auth.signOut();
  window.location = "login.html";
});
