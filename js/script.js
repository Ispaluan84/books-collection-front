const users = document.getElementById('users');
const books = document.getElementById('books');
const usersList = document.getElementById('usersList');
const bookList = document.getElementById('booksList');

const endPointUsers = 'http://localhost:3000/users';
const endPointBooks = 'http://localhost:3000/books';


function getUsers() {
    return fetch(endPointUsers)

    .then ((response) => {
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        return response.json()})
}

users.addEventListener('click', () => {
    getUsers() 
    .then ((data)=> {
        usersList.innerHTML = `
        ${data.map(user => `
        <div class='contList'>
            <h2>${user.nombre} ${user.apellidos}</h2>
            <p><strong>Email: </strong>${user.correo}</p>
            <div class='colection'>
                <p><strong>Colección: </strong></p>
                <ul class='colection'>
                ${Array.isArray(user.coleccion)
                    ? user.coleccion.map(book => `<li>${book}</li>`).join('')
                    : typeof user.coleccion === 'string'
                    ? user.coleccion.split(',').map(book => `<li>${book.trim()}</li>`).join()
                    : `<li>${user.coleccion}</li>`
            }        
            </ul>
            </div>
            <div class='wishList'>
                <p><strong>Wishlist: </strong></p>
                <ul class='wishlist'>
                ${Array.isArray(user.wishlist)
                    ? user.wishlist.map(book => `<li>${book}</li>`).join('')
                    : typeof user.wishlist === 'string'
                    ? user.wishlist.split(',').map(book => `<li>${book.trim()}</li>`).join()
                    : `<li>${user.wishlist}</li>`
                }    
            </ul>
            </div>
        </div>
        `).join('')}`;
        })
        .catch ((error) => {console.error('Error al cargar usuarios: error');
    usersList.innerHTML = '<p>Error al cargar los usuarios</p>';
    })
})

function getBooks() {
    return fetch(endPointBooks)

    .then ((response) => {
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        return response.json()})
}

books.addEventListener('click', () => {
    getBooks() 
    .then ((data)=> {
        booksList.innerHTML = `
        ${data.map(book => `
        <div class='contList'>
            <h2>${book.titulo}</h2>
            <p><img class="image" src="${book.imagen}" alt="${book.titulo}"</p>
            <div class='infoBook'>
                <p><strong>Autor: </strong>${book.autor}</p>
                <p><strong>Año de publicación: </strong>${book.fechaPublicacion}</p>
            </div>
        </div>
        `).join('')}`;
        })
        .catch ((error) => {console.error('Error al cargar usuarios: error');
    usersList.innerHTML = '<p>Error al cargar los usuarios</p>';
    })
})