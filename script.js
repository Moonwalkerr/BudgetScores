// fetching user
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
let user = "";
var totalExpenses = 0;

// Declaring required variables by fetching them from dom using querySelector
const item_name_input = document.querySelector("#item_name");
const amount_spent_input = document.querySelector("#amount_spent");
const addButton = document.querySelector("#add_btn");
const total_expenses = document.querySelector("#total_expenses");
const resetBtn = document.querySelector("#reset_btn");
const ul = document.querySelector(".expense_list");
const logout = document.querySelector("#logout");

auth.onAuthStateChanged((firebaseUser) => {
  // console.log(firebaseUser);
  if (!firebaseUser) {
    window.location = "./login.html";
  }
  if (firebaseUser.uid) {
    user = firebaseUser.uid;
    ul.innerHTML = "";
    db.collection(user)
      .doc("Expenses")
      .collection("ExpenseArray")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => generateList(doc));
      });
    db.collection(user)
      .doc("TotalExpenses")
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          totalExpenses = doc.data().totalExpenses;
          total_expenses.innerHTML = totalExpenses;
        }
      });
  }
});
// function that takes the snapshot's argument to generate list items of unordered list
function generateList(snapshot_doc) {
  // console.log(snapshot_doc.data());
  const list_item = document.createTextNode(snapshot_doc.data().item);
  const list_amount = document.createTextNode(snapshot_doc.data().amountSpent);
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  const delete_node = document.createTextNode("❌");
  deleteBtn.appendChild(delete_node);
  span.classList.add("list-amount");
  span.appendChild(list_amount);
  span.appendChild(deleteBtn);

  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.appendChild(list_item);
  li.appendChild(span);
  ul.appendChild(li);
}

function updateTotalExpenses(expense) {
  // console.log(totalExpenses, expense);
  db.collection(user)
    .doc("TotalExpenses")
    .set({
      totalExpenses: totalExpenses + expense,
    });
  db.collection(user)
    .doc("TotalExpenses")
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        totalExpenses = doc.data().totalExpenses;
        total_expenses.innerHTML = totalExpenses;
      }
    });
}

// Logout event listener
logout.addEventListener("click", () => {
  auth.signOut();
  window.location = "./login.html";
});

// Now comes firestore part
const db = firebase.firestore();

// Adding Expense Button
addButton.addEventListener("click", () => {
  let amountSpent = parseInt(amount_spent_input.value, 10);

  total_expenses.innerHTML = "";
  updateTotalExpenses(amountSpent);

  db.collection(user).doc("Expenses").collection("ExpenseArray").add({
    item: item_name_input.value,
    amountSpent: amountSpent,
    timestamp: timestamp,
  });

  ul.innerHTML = "";
  db.collection(user)
    .doc("Expenses")
    .collection("ExpenseArray")
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => generateList(doc));
    });

  item_name_input.value = "";
  amount_spent_input.value = "";
});

// Reset Button
resetBtn.addEventListener("click", () => {
  ul.innerHTML = "";
  total_expenses.innerHTML = "0";
  item_name_input.value = "";
  amount_spent_input.value = "";
  db.collection(user)
    .doc("Expenses")
    .collection("ExpenseArray")
    .get()
    .then((response) => {
      response.forEach((doc) => doc.ref.delete());
    });

  db.collection(user).doc("TotalExpenses").set({
    totalExpenses: 0,
  });
});
