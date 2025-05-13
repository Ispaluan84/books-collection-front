const users = document.getElementById('users');
const books = document.getElementById('books');
const usersList = document.getElementById('usersList');
const bookList = document.getElementById('booksList');

const endPointUsers = 'http://localhost:3000/users';


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
        <div class='contList'
            <h2>${user.nombre} ${user.apellidos}</h2>
            <p><strong>Email: </strong>${user.correo}</p>
            <ul class='colection'>
                <li><strong>Colección: </strong>${user.coleccion}</li>
            </ul>
            <ul class='wishList'>
                <li><strong>Wishlist: </strong>${user.wishlist}</li>
            </ul>
        </div>
        `).join('')}`;

        })
    })

  .catch ((error) => {console.error('Error al cargar usuarios: error');
    usersList.innerHTML = '<p>Error al cargar los usuarios</p>';
  })