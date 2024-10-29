export function createMemoElement(memo) {
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

    // Add an icon to delete button
    const listButtonIcon = document.createElement("i");
    listButtonIcon.classList.add("fa-regular","fa-trash-can");
    listButtonElement.append(listButtonIcon);

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

// Create memo object
export function createMemoObject(date, text, memoId, allMemo) {
    const object = {
        date,
        text,
        memoId
    }
    allMemo.unshift(object);
    saveMemo(allMemo);
    return object;
}

// Save and load memo in local storage
function saveMemo(allMemo) {
    localStorage.setItem("memos",JSON.stringify(allMemo));
}