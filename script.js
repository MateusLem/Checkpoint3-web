let posts = [];

function addPost(postText, category, images) {
    const post = {
        text: postText,
        category: category,
        images: images,
        date: new Date()
    };
    posts.push(post);
}

function renderPosts(category = "none") {
    const postsGroup = document.querySelector('.posts');
    postsGroup.innerHTML = '';

    posts.forEach(post => {
        if (category === "none" || post.category === category) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            
            const textElement = document.createElement('p');
            textElement.textContent = post.text;
            postElement.appendChild(textElement);

            if (post.images.length > 0) {
                const imageGroup = document.createElement('div');
                imageGroup.classList.add('imageGroup');
                post.images.forEach(imageUrl => {
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageGroup.appendChild(imageElement);
                });
                postElement.appendChild(imageGroup);
            }

            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Categoria: ${capitalizeFirstLetter(post.category)}`;
            postElement.appendChild(categoryElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = `Postado em: ${post.date.toLocaleString()}`;
            postElement.appendChild(dateElement);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editPost(posts.indexOf(post)));
            postElement.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deletePost(posts.indexOf(post)));
            postElement.appendChild(deleteButton);

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('buttonContainer');
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            postElement.appendChild(buttonContainer);

            postsGroup.appendChild(postElement);
        }
    });
}

function post() {
    const postText = document.getElementById('postText').value;
    const category = document.getElementById('postCategory').value;
    const images = [];
    
    for (let i = 1; i <= 3; i++) {
        const imageUrl = document.getElementById(`postImg${i}`).value;
        if (imageUrl.trim() !== '') {
            images.push(imageUrl);
        }
    }

    addPost(postText, category, images);
    renderPosts();
}

function editPost(index) {
    const newText = prompt('Digite o novo texto do post:');
    if (newText !== null) {
        posts[index].text = newText;
        renderPosts();
    }
}

function deletePost(index) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este post?');
    if (confirmDelete) {
        posts.splice(index, 1);
        renderPosts();
    }
}


function filterByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    renderPosts(selectedCategory);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.getElementById('postButton').addEventListener('click', post);
document.getElementById('categoryFilter').addEventListener('change', filterByCategory);

addPost("Primeiro post", "culture", ["#.png", "#.png"]);
addPost("Segundo post", "games", ["#.png"]);
addPost("Terceiro post", "gossip", ["#.png"]);

renderPosts();
