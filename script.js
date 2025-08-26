const myLibrary = [];

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

        const cardDisplay = document.getElementsByClassName("card-display")[0];
        console.log(cardDisplay);
        cardDisplay.appendChild(newCard);
    }
}

addBookToLibrary("Harry Potter", "JK Rowling", 300, true);
addBookToLibrary("My Book", "Me", 200, false);
addBookToLibrary("Your Book", "You", 50, true);

addLibraryToDisplay();