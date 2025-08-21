import { initSignup } from './signup.js'; 
// When ready, add login import and routing:
// import { initLogin } from './login.js';

const appDiv = document.getElementById('app');
const auth = window.firebaseAuth;

function router() {
  const hash = window.location.hash || '#signup';
  console.log("Router hash:", hash);

  if (hash === '#signup') {
    initSignup(appDiv, auth);
  } 
  // Uncomment when login implemented:
  // else if (hash === '#login') {
  //   initLogin(appDiv, auth);
  // }
  else {
    appDiv.innerHTML = '<h2>Page not found</h2>';
  }
} 

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
