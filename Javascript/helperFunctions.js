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
    let dateAndTime = new Date().toLocaleString().split(",");
    return "~" + new Date().toString().split(" ").splice(1, 3).join(" ") + " " + dateAndTime[1];
}

async function getAllUsers() {
    try {
        const res = await getAllUsersRequest();
        if (res.data.status === "success") {
            const arr = Array.from(res.data.data[0]);
            let allUserName = arr.map(singleObj => singleObj.name);
            return allUserName;
        }
    } catch (err) {
        console.log(`Error in getAllUsers() : ${err}`);
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
    try {
        let onlineUsers = await getAllOnlineOfflineRequest();
        onlineUsers = onlineUsers?.data?.data;

        let allFriends = friendList.children;

        if (onlineUsers?.length >= 1 && nameInFriendList?.length >= 1) {
            for (let i = 0; i < allFriends.length; i++) {
                if (allFriends && onlineUsers.includes(nameInFriendList[i]))
                    allFriends[i].querySelector(".friendSeen").textContent = "Online";
                else if (allFriends) allFriends[i].querySelector(".friendSeen").textContent = "Offline";
            }
        }
    } catch (err) {
        console.log(`Error in updateOnlineOfflineStatus() : ${err}`);
    }
}
// On login or on Reload
async function updateUserFriendList(userName) {
    try {
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
    } catch (err) {
        console.log(`Error in updateUserFriendList() : ${err}`);
    }
}

function setMessagesTime(time) {
    let messagesTime = messageTimetemplate(time);
    messagesSendAndRecieveDiv.insertAdjacentHTML("beforeend", messagesTime);
    messagesSendAndRecieveDiv.lastChild.scrollIntoView();
}
