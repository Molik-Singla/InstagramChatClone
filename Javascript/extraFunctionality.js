inputPassword.addEventListener("input", e => {
    showPasswordBtn.classList.remove("hidden");
    if (inputPassword.value < 1) showPasswordBtn.classList.add("hidden");
});

showPasswordBtn.addEventListener("click", e => {
    e.preventDefault();
    if (inputPassword.type === "text") {
        inputPassword.type = "password";
        showPasswordBtn.textContent = "Show";
    } else {
        inputPassword.type = "text";
        showPasswordBtn.textContent = "Hide";
    }
});

// 2) 👉👉👉👉👉 Switch login or Signup
doLogin.addEventListener("click", () => {
    doLogin.classList.add("hidden");
    doSignup.classList.remove("hidden");
    doLogin.previousElementSibling.textContent = "Don't have an account?";
    inputPasswordConfirm.classList.add("hidden");

    insideSubmitBtn.classList.remove("hidden");
    insideSubmitBtn.textContent = "Login";
});

doSignup.addEventListener("click", () => {
    doSignup.classList.add("hidden");
    doLogin.classList.remove("hidden");
    doLogin.previousElementSibling.textContent = "Already have an account?";
    inputPasswordConfirm.classList.remove("hidden");

    insideSubmitBtn.classList.remove("hidden");
    insideSubmitBtn.textContent = "Signup";
});

warningOkBtn.addEventListener("click", () => {
    closeWarningDiv();
});
