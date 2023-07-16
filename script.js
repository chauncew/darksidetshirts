const image1 = document.querySelector('.image1')
const price = document.querySelectorAll('.price p')
const shirts = document.querySelectorAll('.shirts')
const shoppingAmt = document.querySelector('.shoppingAmt')
const productsEl = document.querySelector('.products')
const cartItemsEl = document.querySelector('.cartItems')
const total = document.querySelector('.dollarTotal')
const shoppingCart = document.querySelector('.cart')
const cartWrapper = document.querySelector('.cartWrapper')
const closeCart = document.querySelector('.closeCart')
const checkout = document.querySelector('.checkoutBtn')
const checkoutModal = document.querySelector('.checkout-modal')


// Sliding navigation animations
const closeButton = document.querySelector('.closeButton');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelectorAll('.nav');

hamburger.addEventListener('click', () => {
    nav.forEach((navEl) => {
        navEl.classList.toggle('visible')
    })
})
closeButton.addEventListener('click', () => {
    nav.forEach((navEl) => {
        navEl.classList.remove('visible')
    })
})

//Exclusive Products
let products = [
  {
    id: 0,
    name: 'Gotcha',
    price: 45.99,
    inCart: 0,
    inStock: 10,
    image: './images/exclusive1.jpg',
  },
  {
    id: 1,
    name: 'Cheeze',
    price: 42.99,
    inCart: 0,
    inStock: 10,
    image: './images/exclusive2.webp',
  },
  {
    id: 2,
    name: 'Kingz',
    price: 53.99,
    inCart: 0,
    inStock: 10,
    image: './images/exclusive3.jpg',
  },
  {
    id: 3,
    name: 'Devil Smoke',
    price: 50.99,
    inCart: 0,
    inStock: 10,
    image: './images/exclusive4.webp',
  },
  {
    id: 4,
    name: 'Broken',
    price: 39.99,
    inCart: 0,
    inStock: 10,
    image: (src = 'images/exclusive5.jpg'),
  },
  {
    id: 5,
    name: 'Ace',
    price: 56.99,
    inCart: 0,
    inStock: 10,
    image: (src = 'images/exclusive6.jpg'),
  },
  {
    id: 6,
    name: 'Blue Blaze',
    price: 53.99,
    inCart: 0,
    inStock: 10,
    image: (src = 'images/exclusive7.jpg'),
  },
  {
    id: 7,
    name: 'Red Eye',
    price: 41.99,
    inCart: 0,
    inStock: 10,
    image: (src = 'images/exclusive8.jpg'),
  },
]

// Landing page animations

//This function will show the cart
shoppingCart.addEventListener('click', () => {
  cartWrapper.classList.toggle('cartWrapperActive')
})

closeCart.addEventListener('click', () => {
  cartWrapper.classList.remove('cartWrapperActive')
  checkoutModal.classList.remove('active')
  location.reload()
})

function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="shirts">
                <img src=${product.image} alt="">
                <div class="exclusive-info" onclick="addToCart(${product.id})">
                    <p>${product.name}</p>
                    <p class="productPrice">$${product.price}</p>
                    <h4 class="addToCart">Add To Cart</h4>
                </div>
            </div>
        `
  })
}

renderProducts()

//Add to cart array
let cart = JSON.parse(localStorage.getItem('CART')) || []
updateCart();

function addToCart(id)  {
  if (cart.some((item) => item.id === id)) {
    changeUnits('add', id)
  } else {
    const item = products.find((product) => product.id === id)
    cart.push({
      ...item,
      numberOfUnits: 1,
    })
  }
  updateCart()
}

// This function will update the cart
function updateCart() {
  renderCartItems()
  renderSubtotal()

  //This will save items to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

localStorage.getItem('CART')


//This function will calculate and render the total price of items
function renderSubtotal() {
  let totalPrice = 0
  let totalItems = 0
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits
    totalItems += item.numberOfUnits
    
  })
  total.innerHTML = `$<span>${totalPrice.toFixed(2)}</span>`
  shoppingAmt.innerHTML = totalItems
}

//This function will update the cart items
function renderCartItems() {
  cartItemsEl.innerHTML = '' //This will clear the cart and not duplicate cart item
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <div class="cartItem">
        <div class="itemInfo">
            <img src="${item.image}" onclick="removeItem(${item.id})" alt="">
            <h4>${item.name}</h4>
            <div class="unitPrice">
                <small>$</small>${item.price}
            </div>
            <div class="itemUnits">
                <div class="minus" onClick="changeUnits('minus', ${item.id})">-</div>
                <div class="units">${item.numberOfUnits}</div>
                <div class="add" onClick="changeUnits('add', ${item.id})">+</div>
            </div>
        </div>
    </div>
`
  })
}

//This function will remove items from the cart
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id)
  updateCart()
}

//This function will change the number of units add or subtracted
function changeUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits
    if (item.id === id) {
      if (action === 'minus' && numberOfUnits > 1) {
        numberOfUnits--
      } else if (action === 'add' && numberOfUnits < item.inStock) {
        numberOfUnits++
      }
    }
    return {
      ...item,
      numberOfUnits,
    }

  })
  updateCart()
}

//This function will display the checkout modal
checkout.addEventListener('click', function() {
  checkoutModal.classList.add('active')
  total.innerHTML = `$<span></span>`;
  cartItemsEl.innerHTML = ''
  shoppingAmt.innerHTML = 0
  // numberOfUnits = 0
  localStorage.clear();
})



//Exclusive section animations
gsap.registerPlugin()
gsap.registerPlugin(ScrollTrigger)



//Men and women animations

