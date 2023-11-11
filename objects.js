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
    let checked = "";
    for (let key in bookObject) {
        if (key == "info") { continue; };
        if (key == "read") {
            let bookElement = `<p class='${key}'>${key}: ${bookObject[key]}</p>`;
            if (bookObject[key] == true) {
                checked = "checked='checked'";
            }
        }
        let bookElement = `<p class='${key}'>${key}: ${bookObject[key]}</p>`;
        bookHTML = bookHTML + bookElement;
    }
    return bookHTML + `<div><button class="delete" data-index=${index}>-</button ></div ><div><label>Read?</label><input type="checkbox" class="bread" data-index=${index} ${checked}></div></div>`;
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
    // add book functionality
    const addButton = document.querySelector("#header>button");
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");
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
        // add book to interface
        injectHTML(createLibraryHTML(myLibrary), "library");
    });
    // event delegation for delete and read button - books
    document.querySelector("#library").onclick = function (event) {
        let target = event.target;
        index = target.dataset.index;
        if (target.className == "delete") {
            myLibrary.splice(index, 1);
            injectHTML(createLibraryHTML(myLibrary), "library");
        }
        // read button
        if (target.className == "bread") {
            myLibrary[index]["read"] = target.checked;
            injectHTML(createLibraryHTML(myLibrary), "library");
        }
        else { return };
    };
});