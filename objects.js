const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    const readString = read == "yes" ? "read" : "not read yet";
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${readString}`;
    };
};

function addBookToLibrary(title, author, pages, read) {
    // gets called from the form
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createBookHTML(bookObject) {
    let bookHTML = "<div class='book'>";
    for (let key in bookObject) {
        if (key == "info") { continue; };
        let bookElement = `<p class='${key}'>${key}: ${bookObject[key]}</p>`;
        bookHTML = bookHTML + bookElement;
    }
    return bookHTML + "</div>";
}

function createLibraryHTML(booksArray) {
    let libraryHTML = "";
    booksArray.forEach(book => {
        let bookHTML = createBookHTML(book);
        libraryHTML = libraryHTML + bookHTML;
    });
    return libraryHTML;
}

function injectHTML(HTML, id) {
    myDiv = document.getElementById(id);
    myDiv.innerHTML = HTML;
}



// TEST

const dosto = new Book('Crime and Punishment', 'Fyodor Dosto', '567', 'no');
addBookToLibrary("War and Peace", "Lev Tolstoi", 760, "yes");
addBookToLibrary("Lolita", "Vladimir Nabokov", 260, "yes");
console.log(myLibrary);
console.log(dosto.info());
console.log(myLibrary[0].info());
console.log(dosto.valueOf());
Object.getPrototypeOf(dosto);
console.log(createBookHTML(dosto));
console.log(createLibraryHTML(myLibrary));

// Create library

window.addEventListener('load', (event) => {
    injectHTML(createLibraryHTML(myLibrary), "library");
    console.log("Page Loaded");
    const addButton = document.querySelector("#header>button");
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });
    closeButton.addEventListener("click", () => {
        const bookData = new FormData(document.querySelector("form"));
        alert(bookData[0]);
        dialog.close();
        alert("Added book!");
    })
});