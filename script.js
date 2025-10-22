const booksCont = document.querySelector(".books");
const addBookButton = document.querySelector(".add-book-button");
const submitBookButton = document.querySelector(".submit-book-button");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");

let books = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = false;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages){
    const book = new Book(title, author, pages);
    books.push(book);
    display();
}


function display() {
    booksCont.innerHTML = "";
    // display empty message if the books array is empty
    if(books.length === 0) {
        booksCont.innerHTML = `<p class="empty-message">Empty! Add a book</p>`
        return;
    }

    // displays each books from the books array
    books.forEach((book) => {
        const bookEl = document.createElement("li");
        bookEl.className = "book";
        const title = document.createElement("h2");
        title.className = "title";
        const author = document.createElement("p");
        author.className = "author";
        const pages = document.createElement("p");
        pages.className = "pages";
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Remove";
        const readButton = document.createElement("button");
        readButton.className = "read-button";
        if(book.readStatus) {
            readButton.innerText = "Read";
            readButton.classList.add("read");
        } else {
            readButton.innerText = "Unread";
            readButton.classList.remove("read");
        }

        const contentCont = document.createElement("div");
        contentCont.className = "content";
        const optionsCont = document.createElement("div");
        optionsCont.className = "options";


        bookEl.dataset.id = book.id;
        title.innerText = book.title;
        author.innerHTML = `Written by:  <span class="author-name">${book.author}</span>`;
        pages.innerHTML = `Pages:  <span class="pages-number">${book.pages}</span>`;

        contentCont.append(title, author, pages);
        optionsCont.append(readButton, deleteButton)
        bookEl.append(contentCont, optionsCont);

        booksCont.append(bookEl);

        readButton.addEventListener("click", () => {
            books = books.map((b) => {
                if(b.id === bookEl.dataset.id) {
                    b.readStatus = !b.readStatus;
                }
                return b;
            })
            display();
        })

        deleteButton.addEventListener("click" , () => {
            books = books.filter((b) => {
                return b.id !== bookEl.dataset.id;
            })
            display();
        })

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