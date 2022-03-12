function changeMessagesNavInfo(friendName) {
    messageBoxDivNavName.textContent = friendName;
}
function getMessagesNavInfo() {
    return messageBoxDivNavName.textContent;
}

searchInput.addEventListener("focus", async () => {
    waiting = getAllUsers();
});

messageSendInput.addEventListener("keydown", evt => {
    if (evt.key === "Enter") messageSendBtn.click();
});

searchInput.addEventListener("input", async () => {
    searchResultDiv.innerHTML = "";
    let allNames = await waiting;

    let results = allNames.filter(singleName => {
        return singleName.includes(searchInput.value);
    });

    results = results.filter(nme => {
        return nme !== localStorage.getItem("name");
    });
    console.log(results);
    if (searchInput.value.length > 1 && results.length >= 1) {
        for (let result of results) {
            let searchResult = searchResultsTemplate(result);

            searchResultDiv.insertAdjacentHTML("beforeend", searchResult);
        }
    }
    if (searchInput.value.length > 1 && results.length === 0)
        searchResultDiv.innerHTML = `<div class="noResultFound fully-flex h-14 text-sm font-semibold text-gray-500">No Result Found</div>`;
});

searchResultDiv.addEventListener("click", async function (evt) {
    // Get friend Name from search
    let friendName = evt.target.closest(".searchResult")?.children[1].textContent.trim();

    // If its undefined then Return
    if (!friendName) {
        searchResultDiv.innerHTML = "";
        searchInput.value = "";
        return "Its Undefined";
    }

    // If already a Friend Then open chats of Us
    if (nameInFriendList.includes(friendName)) {
        searchResultDiv.innerHTML = "";
        searchInput.value = "";
        let roomName = `${localStorage.getItem("name")}-${friendName}`;
        await openChatWithFriendAndSaveOnClose(roomName);
        return;
    }

    // If its new Friend then add in nameInFriendList array
    if (!nameInFriendList.includes(friendName) && friendName) nameInFriendList.push(friendName);

    let res = await getUserByNameRequest(friendName);
    if (res.data.status === "success") {
        let friendName = res.data.data.user.name;
        addFriendToFriendList(friendName);

        searchResultDiv.innerHTML = "";
        searchInput.value = "";

        await updateFriendListRequest(localStorage.getItem("name"), friendName);
        await updateFriendListRequest(friendName, localStorage.getItem("name"));

        let roomName = `${localStorage.getItem("name")}-${friendName}`;
        await openChatWithFriendAndSaveOnClose(roomName);

        await updateUserFriendList(localStorage.getItem("name"));
    }
});
