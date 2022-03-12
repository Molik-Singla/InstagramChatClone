function inputDatavalidator(userObj) {
    if (userObj.password !== userObj.confirmPassword) {
        openWarningDiv("Invalid Password or Confirm Passwrod");
        return false;
    } else {
        if (!userObj.email.includes("@gmail.com") || userObj.name.includes(" ")) {
            openWarningDiv("Please enter Correct Email or Join Name with _");
            return false;
        }
    }
    return true;
}

// Get input values to user {}
function getUserFromInputValues() {
    user.email = inputs[0].value;
    user.name = inputs[1].value;
    user.password = inputs[2].value;
    user.confirmPassword = inputs[3].value;
}

function emptyInputs() {
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    inputs[3].value = "";
}
// login  ===>  switch screen  ===>  save to localStorage
async function loggingUser(user) {
    delete user.confirmPassword;
    enableLoadingSpinner();

    let res = await loginRequest(user);

    if (res.data.status !== "success") {
        openWarningDiv(res.data.data);
        emptyInputs();
        getUserFromInputValues();
        disableLoadingSpinner();
        return;
    }
    let dataObj = res.data;
    if (dataObj.status === "success") {
        setPulseAnimationOnSingleFriend(res.data.data.friendList.length);
        disableLoadingSpinner();
        // Switch To App
        switchLoginToApp();

        // Save userInfo to LocalStorage
        localStorage.setItem("name", dataObj.data.name);
        localStorage.setItem("id", dataObj.data.id);

        setUserNameDiv(localStorage.getItem("name"));

        // SWicth to Online in Database
        await addOnlineOfflineRequest(localStorage.getItem("name"));

        // Update User FriendList
        updateUserFriendList(dataObj.data.name);
    }
}

// signup  ===>  switch screen  ===>  save to localStorage
function resetForSigningUp() {
    emptyInputs();
    getUserFromInputValues();
    disableLoadingSpinner();
}
async function signingUser(user) {
    enableLoadingSpinner();
    if (!inputDatavalidator(user)) {
        resetForSigningUp();
        return;
    }
    let res = await sigupRequest(user);

    if (res.data.status !== "success") {
        openWarningDiv(res.data.message);
        resetForSigningUp();
        return;
    }
    let dataObj = res.data;
    if (dataObj.status === "success") {
        disableLoadingSpinner();

        switchLoginToApp();

        localStorage.setItem("name", dataObj.data.name);
        localStorage.setItem("id", dataObj.data.id);

        setUserNameDiv(localStorage.getItem("name"));

        // SWicth to Online in Database
        await addOnlineOfflineRequest(localStorage.getItem("name"));
    }
}

// Handle submit either login or signup
submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    getUserFromInputValues();

    // Login Request
    if (submitBtn.textContent.trim() === "Login") await loggingUser(user);

    // Signup request
    if (submitBtn.textContent.trim() === "Signup") await signingUser(user);
});
