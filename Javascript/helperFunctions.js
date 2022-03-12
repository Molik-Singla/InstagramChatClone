function switchLoginToApp() {
    disableInstagramLoadingAnimation();
    logInPage.classList.add("hidden");
    logInPage.classList.remove("fully-flex");

    headerNav.classList.remove("hidden");

    main.classList.remove("hidden");
    main.classList.add("fully-flex");

    // Save username and id on localStorage
}
function closeWarningDiv() {
    warningDiv.classList.remove("fully-flex");
    warningDiv.classList.add("hidden");
}
function openWarningDiv(msage) {
    warningText.textContent = msage;
    warningDiv.classList.remove("hidden");
    warningDiv.classList.add("fully-flex");
}
function getTodayDateAndTime() {
    let months = "January_Febarury_March_April_May_June_July_August_September_October_Novmember_December".split("_");
    let dateAndTime = new Date().toLocaleString().split(",");
    return `~${months[parseInt(dateAndTime[0].split("/")[0]) - 1]} ${dateAndTime[0].split("/")[1]}, ${dateAndTime[0].split("/")[2]} ${
        dateAndTime[1]
    }`;
}

async function getAllUsers() {
    const res = await getAllUsersRequest();
    if (res.data.status === "success") {
        const arr = Array.from(res.data.data[0]);
        let allUserName = arr.map(singleObj => singleObj.name);
        return allUserName;
    }
}

function enableLoadingSpinner() {
    insideSubmitBtn.classList.add("hidden");

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("fully-flex");
}
function disableLoadingSpinner() {
    insideSubmitBtn.classList.remove("hidden");

    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("fully-flex");
}

function enableInstagramLoadingAnimation() {
    instagramLoadingAnimation.classList.remove("hidden");
    instagramLoadingAnimation.classList.add("fully-flex");
}
function disableInstagramLoadingAnimation() {
    instagramLoadingAnimation.classList.add("hidden");
    instagramLoadingAnimation.classList.remove("fully-flex");
}

function setUserNameDiv(nme) {
    if (localStorage.getItem("name")) userNameNav.textContent = nme;
}

function setPulseAnimationOnSingleFriend(friendCount) {
    let animatedPulse = pulseAnimationForSingleFriend();
    for (let i = 0; i < friendCount; i++) {
        friendList.insertAdjacentHTML("beforeend", animatedPulse);
    }
}
function deletePulseAnimationOnSingleFriend() {
    friendList.innerHTML = "";
}

async function updateOnlineOfflineStatus() {
    let onlineUsers = await getAllOnlineOfflineRequest();
    onlineUsers = onlineUsers?.data?.data;

    let allFriends = friendList.children;

    if (onlineUsers?.length >= 1 && nameInFriendList?.length >= 1) {
        for (let i = 0; i < allFriends.length; i++) {
            if (allFriends && onlineUsers.includes(nameInFriendList[i])) allFriends[i].querySelector(".friendSeen").textContent = "Online";
            else if (allFriends) allFriends[i].querySelector(".friendSeen").textContent = "Offline";
        }
    }
}
// On login or on Reload
async function updateUserFriendList(userName) {
    let friendsRes = await gettingAllFriendsRequest(userName);
    let onlineUsers = await getAllOnlineOfflineRequest();
    let allFriends = friendsRes.data.data;

    if (friendsRes?.data?.status === "success") {
        if (allFriends) {
            deletePulseAnimationOnSingleFriend();
            allFriends.forEach(frnd => {
                if (onlineUsers?.data?.data?.includes(frnd)) addFriendToFriendList(frnd, "Online");
                else addFriendToFriendList(frnd, "Offline");
                nameInFriendList.push(frnd);
            });
        }
    }
}

function setMessagesTime(time) {
    let messagesTime = messageTimetemplate(time);
    messagesSendAndRecieveDiv.insertAdjacentHTML("beforeend", messagesTime);
    messagesSendAndRecieveDiv.lastChild.scrollIntoView();
}