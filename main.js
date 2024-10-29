import { createMemoElement, createMemoObject } from "./memo.js";

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
loadMemo();

// Set proper grammar on memo total text
properText();

function properText() {
    if (memoTotal === 0) {
        memoInfoNumber.innerText = "You have no memos";
    } else if (memoTotal === 1) {
        memoInfoNumber.innerText = `You have ${memoTotal} memo`;
    } else {
        memoInfoNumber.innerText = `You have ${memoTotal} memos`;
    }
}

// Delete all memos
deleteAllButton.addEventListener("click", event => {
    const confirmDelete = confirm("Delete all memos?");
    if (confirmDelete) {
        listContainer.innerHTML = "";
        memoTotal = 0;

        // Set proper grammar on memo total text
        properText();

        // Empty local storage
        localStorage.setItem("memos",JSON.stringify(""));

    }
});

// Create memo on button click
memoAddButton.addEventListener("click", event => {
    addMemo();
});

// Create memo when pressing Enter
memoText.addEventListener("keypress", event => {
    if(event.key === "Enter") {
        addMemo();
    }
})

function addMemo() {
    // Assign value to variables from user input
    const text = memoText.value;
    const date = memoDate.value;

    // Check if text is empty and alert if true
    if (text != "") {

        // Create memo Object and add it to allMemo array
        memoId++;
        const memo = createMemoObject(date, text, memoId, allMemo);

        // Create element and add it to the html
        const createdMemoElement = createMemoElement(memo);
        listContainer.prepend(createdMemoElement);

        // Add new memo to total amount of memos
        memoTotal++;

        // Update information and clear fields
        // Set proper grammar on memo total text
        properText();
        memoText.value = "";
        memoDate.value = "";
    } else {
        alert("You cannot add an empty memo.");
    }
}

// Save and load memo in local storage
function loadMemo() {
    const data = localStorage.getItem("memos");
    allMemo =  JSON.parse(data) || [];
    for (const memo of allMemo) {
        const element = createMemoElement(memo);
        listContainer.append(element);
    }
    memoTotal = allMemo.length;
}