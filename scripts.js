let cart = [];

function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;

    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = item.image;
        cartItem.appendChild(img);

        const name = document.createElement('p');
        name.textContent = item.name;
        cartItem.appendChild(name);

        const price = document.createElement('p');
        price.textContent = '$' + item.price;
        cartItem.appendChild(price);

        const quantity = document.createElement('p');
        quantity.textContent = 'x' + item.quantity;
        cartItem.appendChild(quantity);

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Undo';
        undoButton.classList.add('undo-btn');
        undoButton.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCart(); 
        });

        cartItem.appendChild(undoButton);
        cartItemsContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const description = this.getAttribute('data-description');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('data-image');

        document.getElementById('detail-name').textContent = name;
        document.getElementById('detail-description').textContent = description;
        document.getElementById('detail-price').textContent = price;
        document.getElementById('detail-image').src = image;

        document.querySelector('.product-details-card').style.display = 'block';
        document.querySelector('.overlay').style.display = 'block';
    });
});

document.getElementById('close-details').addEventListener('click', function() {
    document.querySelector('.product-details-card').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});


document.querySelector('.cart').addEventListener('click', function() {
    document.querySelector('.cart-modal').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.product-list').style.pointerEvents = 'none';
});

document.getElementById('close-cart').addEventListener('click', function() {
    document.querySelector('.cart-modal').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.product-list').style.pointerEvents = 'auto';
});

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateCarousel() {
    const offset = -100 * currentIndex;
    carousel.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentIndex);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}, 5000);

const audioPlayer = new Audio();
let currentSong = null;

document.getElementById('toggle-music-card').addEventListener('click', () => {
    const floatingCard = document.getElementById('floating-music-card');
    floatingCard.style.display = floatingCard.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('play-button').addEventListener('click', () => {
    if (currentSong) {
        audioPlayer.play();
    } else {
        alert("Please select a song!");
    }
});

document.getElementById('pause-button').addEventListener('click', () => {
    if (!audioPlayer.paused) {
        audioPlayer.pause();
    }
});

document.getElementById('stop-button').addEventListener('click', () => {
    if (currentSong) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
});

const songs = [
    { title: "Heaven Knows", artist: "Orange and Lemons", src: "audio/Orange & Lemons - Heaven Knows (This Angel Has Flown) [lyrics].mp3" },
    { title: "Shape of You", artist: "Ed Sheeran", src: "audio/Ed Sheeran - Shape Of You (Lyrics) (2).mp3" },
    { title: "FarAway", artist: "Nickelback", src: "audio/Nickelback - Far Away [OFFICIAL VIDEO].mp3" },
    { title: "Over You", artist: "Daughtry", src: "audio/Daughtry - Over You.mp3" },
    { title: "Leave the Door Open", artist: "Bruno Mars, Anderson .Paak, Silk Sonic", src: "audio/Bruno Mars, Anderson .Paak, Silk Sonic - Leave the Door Open [Official Video].mp3" },
    { title: "Creep", artist: "RaidioHead", src: "audio/Radiohead - Creep (Acoustic Cover).mp3" },
    { title: "No. 1 Anthem Party", artist: "Artic Monkeys", src: "audio/Arctic Monkeys - No. 1 Party Anthem.mp3" },
    { title: "Bagani", artist: "Oh! Caraga", src: "audio/Oh! Caraga - Bagani (Official Lyric Video).mp3" },
];

document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const songList = document.getElementById('song-list');
    songList.innerHTML = ''; 

    songs.forEach(song => {
        if (song.title.toLowerCase().includes(query)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${song.title} - ${song.artist}`;
            listItem.addEventListener('click', () => {
                currentSong = song;
                audioPlayer.src = song.src;
                audioPlayer.play();
                alert(`Now Playing: ${song.title} by ${song.artist}`);
            });
            songList.appendChild(listItem);
        }
    });
});


document.getElementById('add-to-cart-btn').addEventListener('click', function() {

    document.querySelector('.product-options-card').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
});

document.getElementById('close-options').addEventListener('click', function() {

    document.querySelector('.product-options-card').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});



document.getElementById('add-to-cart-btn').addEventListener('click', function() {

    document.querySelector('.product-options-card').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
});

document.getElementById('close-options').addEventListener('click', function() {

    document.querySelector('.product-options-card').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});


document.getElementById('confirm-add-to-cart').addEventListener('click', function() {
    
    const productName = document.getElementById('detail-name').textContent;
    const productDescription = document.getElementById('detail-description').textContent;
    const productPrice = parseFloat(document.getElementById('detail-price').textContent.replace('$', ''));
    const productImage = document.getElementById('detail-image').src;


    const existingProduct = cart.find(item => item.name === productName);


    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }


    updateCart();
    
    document.querySelector('.product-details-card').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.product-options-card').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
});



const products = {
    "pet-fashion": [
        { name: 'Frency Blue', description: 'Keep your pet fashionable and warm', price: '$40', image: 'F-Midnight.jpg' },
        { name: 'Midnight', description: 'A cozy dress the reflects the moons shine', price: '$25', image: 'F-Frency-Blue.jpg' },
        { name: 'Feline', description: 'A cozy sweater for your feline friend', price: '$25', image: 'F-Lady.jpg' },
        { name: 'Heart', description: 'A cozy dress thats like the sun, for your feline friend', price: '$25', image: 'F-heart.jpg' },
        { name: 'Bluey', description: 'A cozy dress that marks the vibe of ireland', price: '$25', image: 'F-French.jpg' },
        { name: 'Lady Catty', description: 'A powerful cloth with a powerful aura', price: '$25', image: 'F-Fairy.jpg' },
        { name: 'Gojo?', description: 'A cloth thats been made in the recognition of the greatest Sorcerer', price: '$25', image: 'F-Cool.jpg' },
        { name: 'Baby-baby', description: 'A dress that brings out your pets inner beauty', price: '$25', image: 'F-Cherry.jpg' },
        { name: 'Cool-Dress', description: 'A cool dress for your feline friend', price: '$25', image: 'F-Blue_kanine.jpg' },
        { name: 'Baby-Baby2', description: 'A dress that brings out your pets inner beauty', price: '$25', image: 'F-Blue ribbon.jpg' },
    ],
    "pet-toys": [
        { name: 'Plush Mice', description: 'Durable toy for your cat to chase', price: '$15', image: 'P-1.jpg' },
        { name: 'Mice Ball', description: 'An engaging activity for cats and kittens alike', price: '$10', image: 'P-2.jpg' },
        { name: 'Laser Toy Chain', description: 'Interactive laser toy for cats', price: '$10', image: 'P-3.jpg' },
        { name: 'Fish Toy', description: 'Cat 3D simulation fish toy', price: '$10', image: 'P-4.jpg' },
        { name: 'Bell Ball', description: 'Perfect ball for your dogs', price: '$10', image: 'P-5.jpg' },
        { name: 'Chicken Toy', description: 'A screaming chicken for your dogs', price: '$10', image: 'P-6.jpg' },
        { name: 'Dental Bone', description: 'Nutritional balance that fits all kinds of dogs', price: '$10', image: 'P-7.jpg' },
        { name: 'Toy Mice', description: 'Portable and lightweight, a perfect gift', price: '$10', image: 'P-8.jpg' },
    ],
    "pet-foods": [
        { name: 'CatNip', description: 'High-quality Catnip for your Cat', price: '$30', image: 'T-1.jpg' },
        { name: 'Dog Food', description: 'Nutrient-rich food for your Dog', price: '$20', image: 'T-2.png' },
        { name: 'Puppy Premium', description: 'Nutrient-rich Premium food for your puppy', price: '$25', image: 'T-3.png' },
        { name: 'Puppy Food', description: 'Nutrient-rich food full of Carbs', price: '$25', image: 'T-4.png' },
        { name: 'Premium Dog Food', description: 'Nutrient-rich Premium food for your fully grown Dog', price: '$55', image: 'T-5.png' },
        { name: 'Taste of the Wild', description: 'Nutrient-rich food for your Pet', price: '$85', image: 'T-6.png' },
        { name: 'Healty Pro', description: 'FULL OF NUTRIENTS A-Z', price: '$25', image: 'T-7.png' },
        { name: 'Royal Cain', description: 'Healty Hair, Happy Cat', price: '$35', image: 'T-8.png' },
        { name: 'Cat Snack', description: 'Nutrient-rich Snack for your cat', price: '$25', image: 'T-9.png' },
        { name: 'Cat Snack', description: 'Rich in Vitamins', price: '$25', image: 'T-10.png' },
        { name: 'Pro Cat Food', description: 'Pro Plan for your growing kitten', price: '$45', image: 'T-11.png' },
        { name: 'Proactive Food', description: 'Nutrient-rich food for your cat', price: '$80', image: 'T-12.png' },
    ],
    "pet-care": [
        { name: 'Pet Shampoo', description: 'Gentle shampoo for your pet\'s fur', price: '$12', image: 'pet-shampy.jpg' },
        { name: 'Frontline', description: 'Prevents development of fleas, ticks, and lice', price: '$18', image: 'CA-1.png' },
        { name: 'Pet Bed', description: 'Soft and comfortable bed for your pet', price: '$18', image: 'CA-2.png' },
        { name: 'Cat Shampoo', description: 'A hypoallergenic and fragrance free shampoo', price: '$18', image: 'CA-3.png' },
        { name: 'Cat Litter Deodorizer', description: 'Eliminates odors of cat litter instantly', price: '$18', image: 'CA-4.png' },
        { name: 'Cat Harness', description: 'Secure and comfortable harness for cats', price: '$18', image: 'CA-5.png' },
        { name: 'Pet Clippers', description: 'Safe nail clippers for dogs and cats', price: '$18', image: 'CA-6.png' },
        { name: 'Furminator', description: 'Perfect for grooming pet hair', price: '$18', image: 'CA-7.png' },
        { name: 'Scratch Tower', description: 'A tall scratch tower for cats', price: '$18', image: 'CA-8.png' },
        { name: 'Pet Toothpaste', description: 'No flavor pet-safe toothpaste', price: '$18', image: 'CA-10.png' },
        { name: 'Seresto Collar', description: 'Protect your pet from fleas, ticks, etc.', price: '$18', image: 'CA-11.png' },

    ]
};


document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', function() {
    const category = this.getAttribute('data-category');

    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.category-floating-card').style.display = 'block';


    document.getElementById('category-title').textContent = category.replace('-', ' ').toUpperCase();


    const categoryProducts = products[category];

  
    const productContainer = document.querySelector('.category-products');
    productContainer.innerHTML = '';


    categoryProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;

      const name = document.createElement('h3');
      name.textContent = product.name;

      const description = document.createElement('p');
      description.textContent = product.description;

      const price = document.createElement('p');
      price.textContent = product.price;

      
      const addToCartButton = document.createElement('button');
      addToCartButton.textContent = 'Add to Cart';
      addToCartButton.classList.add('add-to-cart-btn');
      addToCartButton.addEventListener('click', () => {
        cart.push(product);
        updateCart();
      });

      productDiv.appendChild(img);
      productDiv.appendChild(name);
      productDiv.appendChild(description);
      productDiv.appendChild(price);
      productDiv.appendChild(addToCartButton);

      productContainer.appendChild(productDiv);
    });
  });
});


document.getElementById('close-category-card').addEventListener('click', () => {
  document.querySelector('.category-floating-card').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
});


document.querySelector('.overlay').addEventListener('click', () => {
  document.querySelector('.category-floating-card').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
});


const cat = document.getElementById("animated-cat");


function animateCat() {

    cat.style.animation = 'catRandomMovement 5s infinite';

    cat.style.animation += ', catMove 2s infinite';
}


window.onload = function() {
    animateCat();
};
