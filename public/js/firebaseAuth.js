const auth = firebase.auth();
auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    window.location = "../home/";
  }
});
const input_email = document.getElementById("email");
const input_paswd = document.getElementById("paswd");
const signIn_btn = document.getElementById("signIn");
const login_btn = document.getElementById("login");

signIn_btn.addEventListener("click", signIn);
login_btn.addEventListener("click", login);

async function signIn(event) {
  event.preventDefault();
  const email = input_email.value;
  const paswd = input_paswd.value;
  try {
    await auth.createUserWithEmailAndPassword(email, paswd).then((user) => {
      console.log(user);
    });
  } catch (err) {
    alert.log(err.message);
  }
}

async function login(event) {
  event.preventDefault();
  const email = input_email.value;
  const paswd = input_paswd.value;
  try {
    await auth
      .signInWithEmailAndPassword(email, paswd)
      .then((user) => console.log(user));
  } catch (err) {
    alert(err.message);
  }
}
