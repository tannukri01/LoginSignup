
// Panel Toggle

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Dark Mode Toggle + Persistence
const darkModeToggle = document.getElementById("darkModeToggle");

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});


// Validation Helpers

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validatePassword(password) {
  // At least 6 chars, 1 uppercase, 1 number, 1 special char
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(password);
}


// Toast Wrapper

function showToast(message, color = "green") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: color },
  }).showToast();
}


// Sign Up Validation

const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signUpName");
  const email = document.getElementById("signUpEmail");
  const password = document.getElementById("signUpPassword");

  // Reset invalid classes
  [name, email, password].forEach((input) =>
    input.classList.remove("invalid")
  );

  let valid = true;

  if (!name.value.trim()) {
    name.classList.add("invalid");
    showToast("Name is required!", "red");
    valid = false;
  }

  if (!validateEmail(email.value)) {
    email.classList.add("invalid");
    showToast("Invalid email format!", "red");
    valid = false;
  }

  if (!validatePassword(password.value)) {
    password.classList.add("invalid");
    showToast(
      "Password must be 6+ chars, include uppercase, number & special char.",
      "red"
    );
    valid = false;
  }

  if (!valid) return;

  // Success - Backend signup logic can go here
  showToast("Successfully signed up!", "green");
  signUpForm.reset();
});

// =======================
// Sign In Validation
// =======================
const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signInEmail");
  const password = document.getElementById("signInPassword");

  [email, password].forEach((input) => input.classList.remove("invalid"));

  let valid = true;

  if (!validateEmail(email.value)) {
    email.classList.add("invalid");
    showToast("Invalid email format!", "red");
    valid = false;
  }

  if (password.value.length < 6) {
    password.classList.add("invalid");
    showToast("Password must be at least 6 characters.", "red");
    valid = false;
  }

  if (!valid) return;

  // Success - Backend login logic can go here
  showToast("Successfully signed in!", "green");
  signInForm.reset();
});

// =======================
// Enter Key Support
// =======================
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.form.requestSubmit(); // Triggers form validation
    }
  });
});
