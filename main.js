import {loadMemo, addMemo, properText } from "./lib.js";

const memoDate = document.getElementById("memo-date");
const memoText = document.getElementById("memo-text");
const memoAddButton = document.getElementById("memo-add-button");
const listContainer = document.getElementById("list-container");
const memoInfoNumber = document.getElementById("memo-info-number");
const deleteAllButton = document.getElementById("delete-all-button");

let allMemo = [];
let memoTotal = 0;
let memoId = 0;

// Load memo from local storage
memoTotal = loadMemo(allMemo, listContainer);

// Set proper grammar on memo total text
properText(memoTotal, memoInfoNumber);

// Delete all memos
deleteAllButton.addEventListener("click", event => {
    const confirmDelete = confirm("Delete all memos?");
    if (confirmDelete) {
        listContainer.innerHTML = "";
        memoTotal = 0;

        // Set proper grammar on memo total text
        properText(memoTotal, memoInfoNumber);

        // Empty local storage
        localStorage.setItem("memos",JSON.stringify(""));

    }
});

// Create memo on button click
memoAddButton.addEventListener("click", event => {
    addMemo(memoText, memoDate, memoId, listContainer, allMemo);
    memoTotal++;
     // Update information and clear fields
    // Set proper grammar on memo total text
    properText(memoTotal, memoInfoNumber);
    memoText.value = "";
    memoDate.value = "";
});

// Create memo when pressing Enter
memoText.addEventListener("keypress", event => {
    if(event.key === "Enter") {
        addMemo(memoText, memoDate, memoId, listContainer, allMemo);
        memoTotal++;
        // Update information and clear fields
        // Set proper grammar on memo total text
        properText(memoTotal, memoInfoNumber);
        memoText.value = "";
        memoDate.value = "";
        }
})