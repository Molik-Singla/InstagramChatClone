// 1) Authentication
async function loginRequest(dataObj) {
    try {
        let response = await axios({
            method: "post",
            url: "https://instachatclone.herokuapp.com/api/v1/user/login",
            data: dataObj,
        });
        return response;
    } catch (err) {
        console.log("Login Error 🤦‍♀️🤦‍♀️ ", err);
    }
}
async function sigupRequest(dataObj) {
    try {
        let response = await axios({
            method: "post",
            url: "https://instachatclone.herokuapp.com/api/v1/user/signup",
            data: dataObj,
        });
        return response;
    } catch (err) {
        console.log("Signup Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

// 2) Getting Users or User
async function getUserByNameRequest(userName) {
    try {
        let response = await axios({
            method: "get",
            url: `https://instachatclone.herokuapp.com/api/v1/user/${userName}`,
        });
        return response;
    } catch (err) {
        console.log("Get User by Name 🤦‍♀️🤦‍♀️ ", err);
    }
}
async function getAllUsersRequest() {
    try {
        let response = await axios({
            method: "get",
            url: `https://instachatclone.herokuapp.com/api/v1/user`,
        });
        return response;
    } catch (err) {
        console.log("Get All Users Error 🤦‍♀️🤦‍♀️ ", err);
    }
}
async function updateUserByNameRequest(userName, body) {
    try {
        let response = await axios({
            method: "patch",
            url: `https://instachatclone.herokuapp.com/api/v1/user/${userName}`,
            data: body,
        });
        return response;
    } catch (err) {
        console.log("Update User by Name Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

// 3) get or Update FriendList
async function updateFriendListRequest(userName, friendName) {
    try {
        let response = await axios({
            method: "patch",
            url: `https://instachatclone.herokuapp.com/api/v1/user/${userName}`,
            data: {
                friendList: friendName,
            },
        });
        return response;
    } catch (err) {
        console.log("Update userFriendList Error 🤦‍♀️🤦‍♀️ ", err);
    }
}
async function gettingAllFriendsRequest(userName) {
    try {
        let response = await axios({
            method: "get",
            url: `https://instachatclone.herokuapp.com/api/v1/user/${userName}/${true}`,
        });
        return response;
    } catch (err) {
        console.log("gettingAllFriendsRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

// Get all OldMessages
async function gettingOldMessagesRequest(roomName) {
    try {
        let response = await axios({
            method: "get",
            url: `https://instachatclone.herokuapp.com/api/v1/socketRoom/${roomName}`,
        });
        return response;
    } catch (err) {
        console.log("gettingOldMessagesRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}
// Update RoomName and messages
async function updateRoomNameAndMessagesRequest(roomName, messages = undefined) {
    try {
        let response = await axios({
            method: "patch",
            url: `https://instachatclone.herokuapp.com/api/v1/socketRoom`,
            data: { roomName: roomName, oldMessages: messages },
        });
        return response;
    } catch (err) {
        console.log("updateRoomNameAndMessagesRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

// Online-Offline
async function getAllOnlineOfflineRequest() {
    try {
        let response = await axios({
            method: "get",
            url: `https://instachatclone.herokuapp.com/api/v1/onlineOffline`,
        });
        return response;
    } catch (err) {
        console.log("getAllOnlineOfflineRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

async function addOnlineOfflineRequest(userName) {
    try {
        console.log("Added To OnlineOffline Request");
        let response = await axios({
            method: "patch",
            url: `https://instachatclone.herokuapp.com/api/v1/onlineOffline/${userName}`,
        });
        return response;
    } catch (err) {
        console.log("addOnlineOfflineRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}

async function deleteOnlineOfflineRequest(userName) {
    try {
        let response = await axios({
            method: "delete",
            url: `https://instachatclone.herokuapp.com/api/v1/onlineOffline/${userName.trim()}`,
        });
        return response;
    } catch (err) {
        console.log("deleteOnlineOfflineRequest Error 🤦‍♀️🤦‍♀️ ", err);
    }
}
