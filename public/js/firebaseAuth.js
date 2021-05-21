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
const guest_signIn = document.getElementById("guest_signIn");

signIn_btn.addEventListener("click", signIn);
login_btn.addEventListener("click", login);
google_auth.addEventListener("click", signInWithGoogle);
guest_signIn.addEventListener("click", signInAsGuest);

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
    await auth.signInWithEmailAndPassword(email, paswd);
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

async function signInAsGuest(event) {
  event.preventDefault();
  let guest_email = "testUser@test.com";
  let guest_paswd = "123456";
  input_email.value = guest_email;
  input_paswd.value = guest_paswd;
  try {
    await auth.signInWithEmailAndPassword(guest_email, guest_paswd);
  } catch (error) {
    alert(error.message);
  }
}
