function singleFriendInFriendListTemplate(friendName, onlineOffline) {
    return `<div class="singleFriend flex h-[68px] w-full transition ease-linear hover:cursor-pointer hover:bg-hover-grey">
            <div class="friendProfilePic fully-flex h-full w-1/4 lg:w-1/3">
                <img class="w-[52px] rounded-full bg-gray-600 lg:w-10" src="images/profile.png" alt="Pic" />
            </div>
            <div class="friendNameAndSeen flex h-full w-3/4 lg:w-2/3 flex-col justify-center">
                <p class="friendName text-sm">${friendName}</p>
                <p class="friendSeen text-sm text-gray-400">${onlineOffline}</p>
            </div>
            </div>`;
}

function sendMessageTemplate(message) {
    return `<div class="messageSend my-4 box-border flex w-full justify-end pr-8 h-auto">
                <p spellcheck="false" contenteditable="true" class="outline-none border-border-color w-auto max-w-[45%] rounded-3xl border bg-message-background-gray p-3 h-auto">${message}</p>
            </div>`;
}

function recieveMessageTemplate(message) {
    return `<div class="messageRecieve my-4 box-border flex w-full justify-start pl-8">
                <img class="relative right-2 h-6 w-6 self-end rounded-full bg-gray-600" src="images/profile.png" alt="" />
                <p spellcheck="false" contenteditable="true" class="outline-none border-border-color w-fit max-w-[45%] rounded-3xl border p-3">${message}</p>
            </div>`;
}

function messageTimetemplate(time) {
    return `<div class="messageTime my-5 w-full text-center text-xs text-gray-400 fully-flex">${time}</div>`;
}

function searchResultsTemplate(result) {
    return `<div class="searchResult flex h-14 w-full hover:cursor-pointer hover:bg-hover-grey">
                <div class="profileImage fully-flex h-full w-1/4 md:w-2/5">
                    <img class="w-10 rounded-full bg-gray-600" src="images/profile.png" alt="Pic" />
                </div>
                <div class="userName flex h-full w-3/4 items-center font-primary text-sm font-semibold md:w-3/5">${result}</div>
            </div>`;
}

function pulseAnimationForSingleFriend() {
    return `<div class="h-[68px] w-full max-w-sm">
            <div class="flex h-full animate-pulse">
                <div class="fully-flex h-full w-1/4 lg:w-1/3">
                    <div class="h-[52px] w-[52px] rounded-full bg-slate-200 lg:w-10"></div>
                </div>
                <div class="flex h-full flex-1 flex-col justify-center space-y-3 py-1">
                    <div class="h-3 w-5/6 rounded bg-slate-200"></div>
                    <div class="h-3 w-5/6 rounded bg-slate-200"></div>
                </div>
            </div>
        </div>`;
}
