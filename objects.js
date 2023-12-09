class Book {
    #data = [];
    #read = false;
    constructor(title, author, pages, read) {
        this.#data = [title, author, pages, read];
        this.#read = this.#data[3];
    }
    toggleRead() {
        this.#read = this.#read == true ? false : true;
    }
    toHTML(index) {
        const ul = document.createElement("ul");
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "library-card");
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "delete");
        removeButton.textContent = " - ";
        removeButton.setAttribute("data-index", index);
        bookDiv.appendChild(removeButton);
        this.#data.forEach((element, i) => {
            if (i != 3) {
                const li = document.createElement("li");
                li.textContent = element;
                ul.appendChild(li);
            }
            else {
                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("data-index", index);
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
    removeBook(index) {
        this.#books.splice(index, 1);
    }
    toggleRead(index) {
        const book = this.#books[index];
        book.toggleRead();
    }
    toHTML() {
        const libDiv = document.createElement("div");
        libDiv.setAttribute("id", "my-library");
        this.#books.forEach((book, index) => {
            const bookText = book.toHTML(index);
            libDiv.appendChild(bookText);
        })
        return libDiv;
    }
}
class App {
    #library = {};
    #addEvents() {
        this.#eventShowModal();
        this.#eventAddBook();
        this.#eventRemoveBook();
        this.#eventToggleRead();
    }
    #eventShowModal() {
        const addButton = document.getElementById("add-book");
        const dialog = document.getElementById("add-book-form");
        addButton.addEventListener("click", () => {
            dialog.show();
        })
    }
    #eventAddBook() {
        const addButton = document.querySelector("dialog button");
        addButton.addEventListener("click", () => {
            let author = document.getElementById("author").value;
            let title = document.getElementById("title").value;
            let pages = document.getElementById("pages").value;
            let read = document.getElementById("read").checked;
            let book = new Book(title, author, pages, read);
            let dialog = document.getElementById("add-book-form");
            this.#library.addBook(book);
            dialog.close();
            this.#redraw();
        });
    }
    #eventRemoveBook() {
        // event delegation
        const contentDiv = document.getElementById("content");
        // to be able to access app private properties
        const app = this;
        contentDiv.onclick = function (event) {
            const target = event.target;
            if (target.className == "delete") {
                app.#library.removeBook(target.dataset.index);
                app.#redraw();
            }
        }
    }
    constructor(library) {
        this.#library = library;
    }
    start() {
        this.#redraw();
        this.#addEvents();
    }
    #redraw() {
        const contentDiv = document.getElementById("content");
        contentDiv.textContent = "";
        contentDiv.appendChild(this.#library.toHTML());
    }
    addBook(book) {
        this.#library.addBook(book);
    }
    #eventToggleRead() {
        // event delegation
        const contentDiv = document.getElementById("content");
        // to be able to access app private properties
        const app = this;
        contentDiv.onclick = function (event) {
            const target = event.target;
            alert(target.type);
            if (target.type == "checkbox") {
                app.#library.toggleRead(target.dataset.index);
                app.#redraw();
            }
        }
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