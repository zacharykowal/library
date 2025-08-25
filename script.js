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