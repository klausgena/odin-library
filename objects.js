const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    const readString = read == true ? "read" : "not read yet";
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${readString}`;
    };
};

function addBookToLibrary(title, author, pages, read) {
    // gets called from the form
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createBookHTML(bookObject, index) {
    let bookHTML = "<div class='book'>";
    for (let key in bookObject) {
        if (key == "info") { continue; };
        let bookElement = `<p class='${key}'>${key}: ${bookObject[key]}</p>`;
        bookHTML = bookHTML + bookElement;
    }
    return bookHTML + `<div><button class="delete" data-index=${index}>-</button ></div ><div><label for="read">Read?</label><input type="checkbox" id="read"></div></div>`;
}

function createLibraryHTML(booksArray) {
    let libraryHTML = "";
    booksArray.forEach((book, index) => {
        let bookHTML = createBookHTML(book, index);
        libraryHTML = libraryHTML + bookHTML;
    });
    return libraryHTML;
}

function injectHTML(HTML, id) {
    myDiv = document.getElementById(id);
    myDiv.innerHTML = HTML;
}


// Create test data

addBookToLibrary("War and Peace", "Lev Tolstoi", 760, true);
addBookToLibrary("Lolita", "Vladimir Nabokov", 260, false);


// Create library

window.addEventListener('load', (event) => {
    // create interface
    injectHTML(createLibraryHTML(myLibrary), "library");
    const addButton = document.querySelector("#header>button");
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");
    const deleteButtons = document.querySelectorAll(".delete");
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });
    closeButton.addEventListener("click", () => {
        // get form data
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').checked;
        // add book to library
        addBookToLibrary(title, author, pages, read);
        // close popup
        dialog.close();
        // TODO add book to interface
    });
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            alert("event");
            index = deleteButton.dataset.index;
            myLibrary.splice(index, 1);
            // TODO delete book from interface
        });
    });
});