const auth = firebase.auth();
auth.onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    window.location = "./pages/home/";
  }
});
const input_email = document.getElementById("email");
const input_paswd = document.getElementById("paswd");
const signIn_btn = document.getElementById("signIn");
const login_btn = document.getElementById("login");
const google_auth = document.getElementById("google_auth");

signIn_btn.addEventListener("click", signIn);
login_btn.addEventListener("click", login);
google_auth.addEventListener("click", signInWithGoogle);

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

async function signInWithGoogle(event) {
  event.preventDefault();
  let provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider).then((res) => console.log(res.user));
  } catch (err) {
    alert(err.message);
  }
}
