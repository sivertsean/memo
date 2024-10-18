const memoDate = document.getElementById("memo-date");
const memoText = document.getElementById("memo-text");
const memoAddButton = document.getElementById("memo-add-button");
const listContainer = document.getElementById("list-container");
const memoInfoNumber = document.getElementById("memo-info-number");
const deleteAllButton = document.getElementById("delete-all-button");

let allMemo = [];
let memoTotal = 0;
let memoId = 0;

// Create memo object
function createMemoObject(date, text) {
    const object = {
        date,
        text,
        memoId
    }
    allMemo.unshift(object);
    saveMemo();
    return object;
}

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
        const memo = createMemoObject(date, text);

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

function createMemoElement(memo) {
    // Create li element and add corresponding class to it
    const element = document.createElement("li");
    element.classList.add("list-item");

    // Create span element with date and add corresponding class to it
    const listDateElement = document.createElement("span");
    listDateElement.classList.add("list-date");
    const date = memo.date ? new Date(memo.date) : null;

    // Check date and format to weekday
    if (date == null) {
        listDateElement.innerText = "---";
    } else {
        const weekDay = date.toLocaleString("en-us", { weekday: "short" });
        listDateElement.innerText = weekDay;
    }

    // Create span element with text and add corresponding class to it
    const listTextElement = document.createElement("span");
    listTextElement.classList.add("list-text");
    listTextElement.innerText = memo.text;

    // Create button and add corresponding class to it
    const listButtonElement = document.createElement("button");
    listButtonElement.classList.add("list-delete-button");
    listButtonElement.innerText = "x";

    // Make it possible to delete memo
    listButtonElement.addEventListener("click", event => {
        element.remove();

        // Delete memo object from array
        const index = allMemo.findIndex((m)=> {
            return m.memoId === memo.memoId;
        })

        allMemo.splice(index,1);
        saveMemo();

        // Update total memos
        memoTotal--;

        // Set proper grammar on memo total text
        properText();
    })

    // Add elements to the main li element
    element.append(listDateElement);
    element.append(listTextElement);
    element.append(listButtonElement);

    return element;
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

function saveMemo() {
    localStorage.setItem("memos",JSON.stringify(allMemo));
}