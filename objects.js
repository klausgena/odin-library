class Book {
    // TODO # data omzetten in object for key value in #data.entries
    #data = [];
    #read = false;
    constructor(title, author, pages, read) {
        this.#data = [title, author, pages, read];
        this.#read = this.#data[3];
    }
    toggleRead() {
        this.#read = this.#read == true ? false : true;
    }
    toHTML() {
        const ul = document.createElement("ul");
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "library-card");
        this.#data.forEach((element, index) => {
            if (index != 3) {
                const li = document.createElement("li");
                li.textContent = element;
                ul.appendChild(li);
            }
            else {
                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.checked = false;
                if (element) checkbox.checked = true;
                ul.appendChild(checkbox);
            }
            bookDiv.appendChild(ul);
        })
        return bookDiv;
    }
}
class Library {
    #books = [];
    constructor(owner) {
        this.owner = owner;
    }
    info() {
        return `${this.owner}'s library counts ${this.#books.length} books.`
    }
    addBook(book) {
        this.#books.push(book);
    }
    removeBook(badBook) {
        this.#books = this.#books.filter((book) => book != badBook);
    }
    toHTML() {
        const libDiv = document.createElement("div");
        libDiv.setAttribute("id", "my-library");
        this.#books.forEach((book) => {
            const bookText = book.toHTML();
            libDiv.appendChild(bookText);
        })
        return libDiv;
    }
}
class App {
    #library = {};
    constructor(library) {
        this.#library = library;
    }
    start() {
        const contentDiv = document.getElementById("content");
        contentDiv.appendChild(this.#library.toHTML());
        // TODO add events;
    }
    redraw() {
        const contentDiv = document.getElementById("content");
        contentDiv.appendChild(this.#library.toHTML());
    }
    addBook(book) {
        this.#library.addBook(book);
    }
    removeBook(book) {
        this.#library.removeBook(book);
    }
    toggleRead(book) {
        // TODO
    }
}

// Create test data

const bookOne = new Book("War and Peace", "Lev Tolstoi", 760, true);
const bookTwo = new Book("Lolita", "Vladimir Nabokov", 260, false);
const myLib = new Library("Nicolas");
const myApp = new App(myLib);
myApp.addBook(bookOne);
myApp.addBook(bookTwo);
myApp.start();

// Generate html


// Add Event listeners
// Modal dialog
// Remove book
// Change read status

// window.addEventListener('load', (event) => {
//     // create interface
//     injectHTML(createLibraryHTML(myLibrary), "library");
//     // add book functionality
//     const addButton = document.querySelector("#header>button");
//     addButton.addEventListener("click", () => {
//         dialog.showModal();
//     });
//     const dialog = document.querySelector("dialog");
//     const closeButton = document.querySelector("dialog button");
//     closeButton.addEventListener("click", () => {
//         // get form data
//         let title = document.querySelector('#title').value;
//         let author = document.querySelector('#author').value;
//         let pages = document.querySelector('#pages').value;
//         let read = document.querySelector('#read').checked;
//         // add book to library
//         addBookToLibrary(title, author, pages, read);
//         // close popup
//         dialog.close();
//         // add book to interface
//         injectHTML(createLibraryHTML(myLibrary), "library");
//     });
//     // event delegation for delete and read button - books
//     document.querySelector("#library").onclick = function (event) {
//         let target = event.target;
//         index = target.dataset.index;
//         if (target.className == "delete") {
//             myLibrary.splice(index, 1);
//             injectHTML(createLibraryHTML(myLibrary), "library");
//         }
//         // read button
//         if (target.className == "bread") {
//             myLibrary[index]["read"] = target.checked;
//             injectHTML(createLibraryHTML(myLibrary), "library");
//         }
//         else { return };
//     };
// });