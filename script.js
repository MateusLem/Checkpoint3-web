

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderPosts(category = "none") {
    const postsGroup = document.querySelector('.posts');
    postsGroup.innerHTML = '';

    posts.forEach(post =>{
        if (category === "none" || post.category === category){
            let renderedPost = document.createElement('div')
            renderedPost.classList.add('post');

            var teste = `<p>${post.text}</p>
            <div class="images">`

            post.images.forEach( imagem => {
                teste += `<img src="${imagem}"/>` 
            })

            teste += `    
            </div>
            <div class="buttonImages">
                <button onclick="prevImage(${posts.indexOf(post)})">Anterior</button>
                <button onclick="nextImage(${posts.indexOf(post)})">Próxima</button>
            </div>
            <p>Categoria: ${capitalizeFirstLetter(post.category)}</p>
            <p>Postado em: ${post.date.toLocaleString()}</p>
            <div class="buttonContainer">
                <button onclick="editPost(${posts.indexOf(post)})"> Editar </button>
                <button onclick="deletePost(${posts.indexOf(post)})"> Deletar </button>
            </div>            
            `

            renderedPost.innerHTML = teste
            postsGroup.appendChild(renderedPost);            
            
        }
    });
}


function post() {
    const postText = document.getElementById('postText').value;
    const category = document.getElementById('postCategory').value;
    const images = [];
    
    for (let i = 1; i <= 3; i++) {
        const imageUrl = document.getElementById(`postImg${i}`).value;
        if (imageUrl) {
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

function addPost(postText, category, images) {
    const post = {
        text: postText,
        category: category,
        images: images,
        date: new Date()
    };
    posts.unshift(post);
}

function filterByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    renderPosts(selectedCategory);
}

function nextImage(postIndex) {
    const images = document.querySelectorAll(`.post:nth-child(${postIndex + 1}) .images img`);
    if (images.length<2){
        console.log(posts[postIndex])
        let button = document.querySelectorAll(`.post:nth-child(${postIndex + 1}) .buttonImages button`);
        console.log(button)
        button.style.display = 'none';
    } else {
        const currentImage = document.querySelector(`.post:nth-child(${postIndex + 1}) .images img:not([style*="display: none"])`);
        const nextImage = currentImage.nextElementSibling || images[0];
        currentImage.style.display = 'none';
        nextImage.style.display = 'block';
    }    
}

function prevImage(postIndex) {
    const images = document.querySelectorAll(`.post:nth-child(${postIndex + 1}) .images img`);
    const currentImage = document.querySelector(`.post:nth-child(${postIndex + 1}) .images img:not([style*="display: none"])`);
    const prevImage = currentImage.previousElementSibling || images[images.length - 1];
    currentImage.style.display = 'none';
    prevImage.style.display = 'block';
}



let posts = [];

addPost("Primeiro post aqui", "culture", ["./images/profile.png", "./images/park.jpg", "./images/object.webp"]);
addPost("Teu pai aí", "games", ["./images/dad.webp","./images/mom.jpg"]);
addPost("Tenho uma foto da sua casa. Está com medo agora?", "gossip", ["./images/house.jpg"]);

renderPosts();
