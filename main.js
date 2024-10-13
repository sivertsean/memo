const memoDate = document.getElementById("memo-date");
const memoText = document.getElementById("memo-text");
const memoAddButton = document.getElementById("memo-add-button");
const listContainer = document.getElementById("list-container");
const memoInfoNumber = document.getElementById("memo-info-number");
const deleteAllButton = document.getElementById("delete-all-button");

let memoTotal = 0;

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

    // Check if text is empty and alert if true
    if (text != "") {
        const date = memoDate.value ? new Date(memoDate.value) : null;

        // Create element and add it to the html
        const createdMemoElement = createMemoElement(date, text);
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

function createMemoElement(date, text) {
    // Create li element and add corresponding class to it
    const element = document.createElement("li");
    element.classList.add("list-item");

    // Create span element with date and add corresponding class to it
    const listDateElement = document.createElement("span");
    listDateElement.classList.add("list-date");

    // Check date and format to weekday
    if (date === null) {
        listDateElement.innerText = "---";
    } else {
        const weekDay = date.toLocaleString("en-us", { weekday: "short" });
        listDateElement.innerText = weekDay;
    }

    // Create span element with text and add corresponding class to it
    const listTextElement = document.createElement("span");
    listTextElement.classList.add("list-text");
    listTextElement.innerText = text;

    // Create button and add corresponding class to it
    const listButtonElement = document.createElement("button");
    listButtonElement.classList.add("list-delete-button");
    listButtonElement.innerText = "x";

    // Make it possible to delete memo
    listButtonElement.addEventListener("click", event => {
        element.remove();

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