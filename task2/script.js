let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'PRODUCT 1',
        image: 'img1.png',
        price: 400
    },
    {
        id: 2,
        name: 'PRODUCT 2',
        image: 'img2.png',
        price: 600
    },
    {
        id: 3,
        name: 'PRODUCT 3',
        image: 'img3.png',
        price: 220
    },
    {
        id: 4,
        name: 'PRODUCT 4',
        image: 'img4.png',
        price: 1299
    },
    {
        id: 5,
        name: 'PRODUCT 5',
        image: 'img5.png',
        price: 3200
    },
    {
        id: 6,
        name: 'PRODUCT 6',
        image: 'img6.png',
        price: 1209
    },
    {
        id: 7,
        name: 'PRODUCT 7',
        image: 'img7.png',
        price: 1599
    },
    {
        id: 8,
        name: 'PRODUCT 8',
        image: 'img8.png',
        price: 1199
    },
    {
        id: 9,
        name: 'PRODUCT 9',
        image: 'img9.png',
        price: 2000
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button class="add-product-button" onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        if(count<8){
            count = count + value.quantity;
            if(value != null){
                let newDiv = document.createElement('li');
                newDiv.innerHTML = `
                    <div><img src="image/${value.image}"/></div>
                    <div>${value.name}</div>
                    <div>${value.price.toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>`;
                    listCard.appendChild(newDiv);
            }
        }
        else{
            alert("You can only choose 8 items")
        }
        
       
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
