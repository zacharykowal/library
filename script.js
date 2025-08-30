let myLibrary = [];
const newBookButton = document.querySelector(".new-book");
const doneButton = document.querySelector("#done-button");
const addButton = document.querySelector("#submit-button");
const cardDisplay = document.querySelector(".card-display");
const VALIDATION_PASS = 1;
const VALIDATION_FAIL = 0;

function Book(title, author, pages, isRead) {
    
    if (!new.target) {
        throw Error("'new' operator must be used to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter(book => book.id != id);
}

function refreshCardDisplay() {

    cardDisplay.innerHTML = '';

    for (const book of myLibrary) {

        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute('data-book-id', book.id);

        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const isRead = document.createElement("p");

        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;

        const content = book.isRead ? "Read: Yes" : "Read: No";
        isRead.textContent = content;

        newCard.append(title, author, pages, isRead);

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove Book";
        removeButton.classList.add("remove-button");

        const toggleReadButton = document.createElement("button");
        toggleReadButton.innerText = "Change Read Status";
        toggleReadButton.classList.add("toggle-read-button");

        newCard.append(removeButton);
        newCard.append(toggleReadButton);

        cardDisplay.appendChild(newCard);

    }

}

function validateInput(titleInput, authorInput, pagesInput) {
    if (titleInput.value.trim().length === 0) {
        alert("Title field is required.");
        return VALIDATION_FAIL;
    } else if (authorInput.value.trim().length === 0) {
        alert("Author field is required.");
        return VALIDATION_FAIL;
    } else if (pagesInput.value.trim().length === 0) {
        alert("Pages field is required.");
        return VALIDATION_FAIL;
    } else if(!Number(pagesInput.value) || !Number.isInteger(Number(pagesInput.value)) || Number(pagesInput.value) <= 0) {
        alert("Pages field must contain an integer greater than 0.");
        return VALIDATION_FAIL;
    }
    return VALIDATION_PASS;
}

newBookButton.addEventListener("click", function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("hidden");
});

doneButton.addEventListener("click", function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("hidden");
});

addButton.addEventListener("click", function (event) {

    event.preventDefault();

    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");

    const validationResult = validateInput(titleInput, authorInput, pagesInput);
    if (validationResult === VALIDATION_FAIL) {
        return;
    }

    const readStatus = document.querySelector('input[name="read-status"]:checked').value;
    if (readStatus === "yes") {
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, true);
    } else {
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
    }

    refreshCardDisplay();

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';

});

cardDisplay.addEventListener("click", (event) => {

    const parentCard = event.target.parentElement;
    const id = parentCard.dataset.bookId;

    if (event.target.className === "remove-button") {
        removeBookFromLibrary(id);
        refreshCardDisplay();
    } else if (event.target.className === "toggle-read-button") {
        const foundBook = myLibrary.find(book => book.id === id);
        foundBook.toggleReadStatus();
        refreshCardDisplay();
    }

});