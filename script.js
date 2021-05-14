const item_name_input = document.querySelector("#item_name");
const amount_spent_input = document.querySelector("#amount_spent");
const addButton = document.querySelector("#add_btn");
const total_expenses = document.querySelector("#total_expenses");
const resetBtn = document.querySelector("#reset_btn");

const expenseArray = [];

let totalExpenses = 0;

// Adding Expense Button
addButton.addEventListener("click",()=>{
    let amountSpent = parseInt(amount_spent_input.value,10);
    totalExpenses += amountSpent;
    total_expenses.innerHTML = totalExpenses;
    expenseArray.push({
        item:item_name_input.value,
        amountSpent:amountSpent,
    })
    console.log(expenseArray);
})


// Reset Button
resetBtn.addEventListener("click",()=>{
    expenseArray.length = 0;
    console.log(expenseArray);
})