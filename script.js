const myLibrary = [];
const newBookButton = document.querySelector(".new-book");
const doneButton = document.querySelector("#done-button");
const addButton = document.querySelector("#submit-button");

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

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function addLibraryToDisplay() {

    const cardDisplay = document.querySelector(".card-display");
    cardDisplay.innerHTML = '';

    for (const book of myLibrary) {

        const newCard = document.createElement("div");
        newCard.classList.add("card");

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
        cardDisplay.appendChild(newCard);

    }

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

    if (titleInput.value.trim().length === 0) {
        alert("Title field is required.");
        return;
    } else if (authorInput.value.trim().length === 0) {
        alert("Author field is required.");
        return;
    } else if (pagesInput.value.trim().length === 0) {
        alert("Pages field is required.");
        return;
    } else if(!Number(pagesInput.value) || !Number.isInteger(Number(pagesInput.value)) || Number(pagesInput.value) <= 0) {
        alert("Pages field must contain an integer greater than 0.");
        return;
    }

    const readStatus = document.querySelector('input[name="read-status"]:checked').value;
    if (readStatus === "yes") {
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, true);
    } else {
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false);
    }

    addLibraryToDisplay();

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    
});