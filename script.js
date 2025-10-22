const booksCont = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book-button");
const submitBookButton = document.querySelector(".submit-book-button");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");

const books = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    books.push(book);
    display();
}


function display() {
    booksCont.innerHTML = "";
    books.forEach((book) => {
        const bookEl = document.createElement("li");
        bookEl.className = "book";
        const title = document.createElement("h2");
        title.clasName = "title";
        const author = document.createElement("p");
        author.className = "author";
        const pages = document.createElement("p");
        pages.className = "pages";

        title.innerText = book.title;
        author.innerText = `Written By: ${book.author}`;
        pages.innerText = `${book.pages} Pages`;

        bookEl.append(title, author, pages);

        booksCont.append(bookEl);
    })
}


addBookButton.addEventListener("click" , () => {
    document.querySelector("form").classList.toggle("hidden");
})

submitBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value

    if(title === "" || author === "" || pages === "") return;

    addBookToLibrary(title, author, pages);
    document.querySelector("form").classList.add("hidden");
})