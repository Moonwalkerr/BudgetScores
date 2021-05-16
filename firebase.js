const auth = firebase.auth();
auth.onAuthStateChanged((firebaseUser) => {
  // If firebaseUser -> courses.html
  if (firebaseUser) {
    window.location = "index.html";
  }
});
const input_email = document.getElementById("email");
const input_paswd = document.getElementById("paswd");
const submit_btn = document.getElementById("submit");
const login_btn = document.getElementById("login");

submit_btn.addEventListener("click", signIn);

async function signIn(event) {
  event.preventDefault();
  const email = input_email.value;
  const paswd = input_paswd.value;
  try {
    await auth.createUserWithEmailAndPassword(email, paswd).then((user) => {
      console.log(user);
    });
  } catch (err) {
    console.log(error);
  }
}
