const myLibrary = [];

function Book(title, author, pages, read = false, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = cover;
  this.id = crypto.randomUUID();
}

document.querySelector("#add-book-btn").addEventListener("click", () => {
  document.querySelector("#modal").classList.remove("hidden");
});

document.querySelector("#close-modal").addEventListener("click", () => {
  document.querySelector("#modal").classList.add("hidden");
});

document.querySelector("#book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = this.title.value;
  const author = this.author.value;
  const pages = parseInt(this.pages.value);
  const read = this.read.checked;
  const cover = this.cover.value;

  const newBook = new Book(title, author, pages, read, cover);
  myLibrary.push(newBook);
  renderBook(newBook);

  this.reset();
  document.querySelector("#modal").classList.add("hidden");
});

function renderBook(book) {
  const container = document.querySelector(".library-container");

  const card = document.createElement("div");
  card.classList.add("book-card");

  card.innerHTML = `
    <img src="${book.cover}" alt="Book Cover" class="book-cover" />
    <h2 class="book-title">${book.title}</h2>
    <p class="book-author">Author: ${book.author}</p>
    <p class="book-pages">Pages: ${book.pages}</p>
    <p class="book-read">Read: ${book.read ? "Yes" : "No"}</p>
    <button class="delete-btn">Delete</button> <!-- ✅ ADDED -->
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();

    const index = myLibrary.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
  });

  container.insertBefore(card, document.querySelector("#add-book-btn"));
}
