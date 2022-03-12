function addFriendToFriendList(friendName, onlineOffline = "Offline") {
    let newFriend = singleFriendInFriendListTemplate(friendName, onlineOffline);
    friendList.insertAdjacentHTML("beforeend", newFriend);
}
function setSendMessage(message) {
    let sendMessage = sendMessageTemplate(message);
    messagesSendAndRecieveDiv.insertAdjacentHTML("beforeend", sendMessage);
    messagesSendAndRecieveDiv.lastChild.scrollIntoView();
}
function setRecieveMessage(message) {
    let recieveMessage = recieveMessageTemplate(message);
    messagesSendAndRecieveDiv.insertAdjacentHTML("beforeend", recieveMessage);
    messagesSendAndRecieveDiv.lastChild.scrollIntoView();
}

async function gettingOldMessages(roomName) {
    try {
        statingYourMessagesDiv.classList.remove("flex");
        statingYourMessagesDiv.classList.add("hidden");

        messagesBoxDiv.classList.remove("hidden");
        messagesBoxDiv.classList.add("flex", "flex-col");

        let res = await gettingOldMessagesRequest(roomName);

        if (res?.data?.status === "success") {
            messagesSendAndRecieveDiv.innerHTML = "";
            let oldMessages = res.data?.data;
            console.log(oldMessages);
            let ownNameletter = localStorage.getItem("name")[0];
            if (oldMessages) {
                for (let msage of oldMessages) {
                    if (msage[0] === ownNameletter) setSendMessage(msage.slice(2));
                    else if (msage[0] === "~") setMessagesTime(msage.slice(1));
                    else setRecieveMessage(msage.slice(2));
                }
            }
        }
    } catch (err) {
        console.log(`Error in gettingOldMessages() : ${err}`);
    }
}

async function openChatWithFriendAndSaveOnClose(roomName) {
    try {
        messagesArray = [];
        let friendName = roomName.split("-")[1];
        changeMessagesNavInfo(friendName);

        // Fetching old messages
        await gettingOldMessages(roomName);

        let fetchRoomName = await updateRoomNameAndMessagesRequest(roomName);
        fetchRoomName = fetchRoomName.data.data;

        // console.log(fetchRoomName);

        realRoomName = [];
        realRoomName.push(fetchRoomName);
        socket.emit("join", fetchRoomName);
    } catch (err) {
        console.log(`Error in openChatWithFriendAndSaveOnClose() : ${err}`);
    }
}

friendList.addEventListener("click", async function (evt) {
    try {
        if (evt.target.closest(".singleFriend")) {
            // Set friend name on nav
            let friendName = evt.target.closest(".singleFriend").querySelector(".friendName").textContent.trim();

            let roomName = `${localStorage.getItem("name")}-${friendName}`;
            await openChatWithFriendAndSaveOnClose(roomName);
        }
    } catch (err) {
        console.log(`Error in friendList Click Event : ${err}`);
    }
});
