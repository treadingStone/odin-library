let library = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.read = false;
    this.id = crypto.randomUUID();

    this.toggleBookRead = function toggleBookRead() {
        this.read = !this.read;
        updateBookListUI();
        return this.read;
    };
};

function addBookToLibrary(title, author) {
    const newBook = new Book(title, author);
    library = [...library, newBook];
    updateBookListUI();
};

function removeBook(e) {
    const bookID = e.target.parentNode.parentNode.getAttribute('data-id');
    library = library.filter(book => book.id !== bookID);
    updateBookListUI();
};

function toggleReadStatus(e) {
    const bookID = e.target.parentNode.parentNode.getAttribute('data-id');
    library.find(book => book.id === bookID).toggleBookRead();
};

function updateBookListUI() {
    const bookList = document.querySelector(".book-list");
    bookList.querySelectorAll('div').forEach(div => div.remove());
    library.forEach((book) => {
        const bookListChild = document.createElement('div');
        bookListChild.setAttribute('data-id', book.id);
        if (book.read) {
            bookListChild.classList.add('read');
        }
        const bookListChildTitle = document.createElement('p');
        bookListChildTitle.textContent = book.title;
        bookListChild.appendChild(bookListChildTitle);
        const bookListChildAuthor = document.createElement('p');
        bookListChildAuthor.textContent = book.author;
        bookListChild.appendChild(bookListChildAuthor);
        bookList.appendChild(bookListChild);
        const bookListChildButtonContainer = document.createElement('div');
        bookListChildButtonContainer.classList.add('book-buttons');
        const bookListChildRemoveButton = document.createElement('button');
        bookListChildRemoveButton.textContent = 'Remove';
        bookListChildRemoveButton.addEventListener('click', removeBook);
        bookListChildButtonContainer.appendChild(bookListChildRemoveButton);
        const bookListChildReadStatusButton = document.createElement('button');
        bookListChildReadStatusButton.textContent = 'Read';
        bookListChildReadStatusButton.addEventListener('click', toggleReadStatus);
        bookListChildButtonContainer.appendChild(bookListChildReadStatusButton);
        bookListChild.appendChild(bookListChildButtonContainer);
    });
};

const addBookButton = document.querySelector('.add-book-button');
addBookButton.addEventListener('click', (e) => {
    dialog.showModal();
    e.preventDefault();
});

const dialog = document.querySelector('dialog');
const authorEl = document.querySelector('#author');
const titleEl = document.querySelector('#title');

dialog.addEventListener('close', () => {
    const jsonContent = JSON.parse(dialog.returnValue);
    dialog.returnValue === "default"
    ? console.log("No return value.")
    : addBookToLibrary(jsonContent.title, jsonContent.author);
});

const confirmDialogButton = document.querySelector('#confirm');
confirmDialogButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close(JSON.stringify({author: authorEl.value, title: titleEl.value}));
});

function testBooks() {
    let string = 'abcdefghijklmnopqrstuvwxyz1234567890';
    function genString(chars) {
        let gennedString = '';
        for (let n = 0; n < chars; n++) {
            gennedString += string.charAt(Math.floor(Math.random() * string.length));
        };
        return gennedString;
    }
    for (let i = 0; i < 5; i++) {
        addBookToLibrary(genString(10), genString(20));
    };
};

testBooks();