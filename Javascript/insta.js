const showPasswordBtn = document.querySelector(".showPasswordBtn");
const inputPassword = document.querySelector("#inputPassword");
const submitBtn = document.querySelector(".submitBtn");
const insideSubmitBtn = document.querySelector(".insideSubmitBtn");

const headerNav = document.querySelector("header");
const main = document.querySelector("main");
const logInPage = document.querySelector(".logSignPage");

const doSignup = document.querySelector(".doSignup");
const doLogin = document.querySelector(".doLogin");
const inputPasswordConfirm = document.querySelector("#inputConfirmPassword");

const inputs = logInPage.getElementsByTagName("input");
let user = {};
let nameInFriendList = [];

const loadingSpinner = document.querySelector(".loadingSpinner");
const instagramLoadingAnimation = document.querySelector(".instagramLoadingAnimation");

// 1) SearchBar Stuff ---------------------------------------------------------------------------
let messageBoxDivNavName = document.querySelector(".messageBoxDivNavName");
let waiting;
const friendList = document.querySelector(".friendListNames");

let searchResultDiv = document.querySelector(".searchresultDiv");
const searchInput = document.querySelector(".searchInput");

// 2) Messages Div Stuff---------------------------------------------------------------------------
const statingYourMessagesDiv = document.querySelector(".yourMessages");
const messagesBoxDiv = document.querySelector(".messagesBoxDiv");

const messagesSendAndRecieveDiv = document.querySelector(".messagesSendAndRecieveDiv");

const userNameNav = document.querySelector(".userNameNav");

// ------------------------------------------------------------------------------------------------
const messageSendInput = document.querySelector("#messageSendInput");
const messageSendBtn = document.querySelector(".messageSendBtn");

let messagesArray = [];
let realRoomName = [];

const warningDiv = document.querySelector(".warningDiv");
const warningText = document.querySelector(".warningText");
const warningOkBtn = document.querySelector(".warningOkBtn");

let firstCome = true;
if (!localStorage.getItem("name")) {
    logInPage.classList.remove("hidden");
    logInPage.classList.add("fully-flex");
}
