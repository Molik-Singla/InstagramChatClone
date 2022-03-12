// Socket io -------------------------------
const socket = io("http://localhost:8000");

socket.on("recieve-message", message => {
    if (firstCome) {
        let currentTime = getTodayDateAndTime();
        setMessagesTime(currentTime.slice(1));
        firstCome = false;
    }
    messagesArray.push(`${message}`);
    setRecieveMessage(message);
});
messageSendBtn.addEventListener("click", function () {
    if (firstCome) {
        let currentTime = getTodayDateAndTime();
        setMessagesTime(currentTime.slice(1));
        updateRoomNameAndMessagesRequest(realRoomName[0], [currentTime]).then(res => console.log(res));
        firstCome = false;
    }
    let msage = messageSendInput.value;
    setSendMessage(msage);

    messagesArray.push(messageSendInput.value);

    socket.emit("send-message", realRoomName[0], msage);
    let roomName = realRoomName[0].split("-");
    let secretName;
    if (roomName[0] === localStorage.getItem("name")) secretName = roomName[0][0] + roomName[1][0];
    else secretName = roomName[1][0] + roomName[0][0];

    msage = secretName + msage;
    updateRoomNameAndMessagesRequest(realRoomName[0], [msage]).then(res => console.log(res));
    messageSendInput.value = "";
});

socket.on("cutOffOnlineConnection", async () => {
    await deleteOnlineOfflineRequest(localStorage.getItem("name"));
});
socket.on("restart", () => {
    setTimeout(async () => {
        await updateOnlineOfflineStatus(localStorage.getItem("name"));
    }, 2000);
});
socket.on("updateStatusToOthers", async () => {
    setTimeout(async () => {
        await updateOnlineOfflineStatus(localStorage.getItem("name"));
    }, 1000);
});

// window ----------------------------------
window.addEventListener("load", async function () {
    if (localStorage.getItem("name")) {
        console.log("IN LOAD");
        firstCome = true;
        enableInstagramLoadingAnimation();
        await addOnlineOfflineRequest(localStorage.getItem("name"));

        let userName = localStorage.getItem("name");
        let userId = localStorage.getItem("id");

        let res = await getUserByNameRequest(userName);

        console.log(res);
        if (res?.data?.status === "success") {
            let dbName = res.data.data.user.name;
            let dbId = res.data.data.user._id;
            if (userName === dbName && userId === dbId) {
                console.log("Welcome to My Instagram Chat Clone 🎉");
                switchLoginToApp();
            }
        }
        // 2) 👉 Update the user friendList
        setPulseAnimationOnSingleFriend(res.data.data.user.friendList.length);
        await updateUserFriendList(userName);
        setUserNameDiv(localStorage.getItem("name"));
    }
});
window.addEventListener("beforeunload", async function () {
    for (let i = 0; i < 100000; ) {
        if (i === 0) await deleteOnlineOfflineRequest(localStorage.getItem("name"));
        i++;
    }
});

// document.addEventListener("mouseout" , () => {

// })
