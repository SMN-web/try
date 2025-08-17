import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Fill in your Firebase config:
const firebaseConfig = {
  apiKey: "AIzaSyDtZnYYDb5TR01G6zsCtrF0HBR6pnQ2Beg",
    authDomain: "general-68ca7.firebaseapp.com",
    projectId: "general-68ca7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login handler
document.getElementById("login-btn").onclick = async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const msg = document.getElementById("login-msg");
  msg.textContent = "";

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const idToken = await user.getIdToken();
    sessionStorage.setItem("firebaseIdToken", idToken);

    // Role fetch from backend
    const apiRes = await fetch("https://login.nafil-8895-s.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + idToken
      },
      body: JSON.stringify({ email })
    });
    const data = await apiRes.json();
    if (!apiRes.ok || !data.role) {
      msg.textContent = data.message || "❌ Login failed";
      return;
    }
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("dashboard-panel").style.display = "";
    document.getElementById("dash-role").textContent = "Welcome, " + data.role;
  } catch (err) {
    msg.textContent = "❌ " + (err.message || "Invalid login");
  }
};

// Persistent login on reload
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idToken = await user.getIdToken();
    sessionStorage.setItem("firebaseIdToken", idToken);
    document.getElementById("login-panel").style.display = "none";
    document.getElementById("dashboard-panel").style.display = "";
    document.getElementById("dash-role").textContent = "Welcome Back!";
  }
});

// Logout
document.getElementById("logout-btn").onclick = () => {
  signOut(auth);
  sessionStorage.clear();
  document.getElementById("dashboard-panel").style.display = "none";
  document.getElementById("login-panel").style.display = "";
};
