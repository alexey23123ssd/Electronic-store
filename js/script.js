const cart = document.querySelectorAll('.header__icons div')[0]
const cartSlider = document.querySelector('.card__slider')
const cartCloseBtn = document.querySelectorAll('.card__slider button')[0]
const toCartBtn = document.querySelectorAll('.card__slider button')[1]



const buyBtnArr = document.querySelectorAll("[data-btn='buy']")
const itemCounter= document.querySelector('.items__amount')

let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
if(localStorage.getItem("itemArr")){
  itemArr.map((cartItem)=>{
  createCartItem(cartItem)
  })
  }

cart.setAttribute("data-state","closed")

cart.addEventListener('click',()=>{
  let state = cart.getAttribute("data-state")
  if(state==="closed"){
    cartSlider.style.visibility = 'visible';
    cart.setAttribute("data-state","opened")
  }
  else{
     cartSlider.style.visibility = "hidden"
    cart.setAttribute("data-state","closed")
  } 
})

cartCloseBtn.addEventListener('click',()=>{
    cartSlider.style.visibility = "hidden"
    cart.setAttribute("data-state","closed")
})

toCartBtn.addEventListener("click",()=>{
    window.location.href = "/html/cart.html"
})

window.addEventListener("load",()=>{
    count(itemArr)
    calculateSum(itemArr)
})

for(let i=0;i<buyBtnArr.length;i++){
    buyBtnArr[i].addEventListener('click',(btn)=>{
        let itemName = btn.target.parentElement.firstElementChild.textContent;
        let itemPrice = btn.target.previousElementSibling.previousElementSibling.textContent;
        
        const item = {
          id:generateGUID(),
          name:itemName,
          price:itemPrice,
        }
        createCartItem(item)
        itemArr.push(item)
        localStorage.setItem('itemArr',JSON.stringify(itemArr))

        
        calculateCartSum(btn)
        countItems()
        })
}


cartSlider.addEventListener("click",(item)=>{
 const cartSum = document.querySelector('.cart_sum')
 
 if(item.target.matches('img')){
  let itemPrice = Number(item.target.previousElementSibling.previousElementSibling.textContent.slice(1))
  let cartSummary = Number(cartSum.textContent.slice(7))

  cartSummary -= itemPrice
  if(cartSummary<0){
   cartSummary = 0;
  }
  cartSum.textContent = `Итого:$ ${cartSummary}`
   
  const itemId = item.target.closest('div').id
  const cont = item.target.closest('div')
  removeCartItem(cont,itemId)
  countRemoveItems(item)
 }
})


function createCartItem(cartItem){
  let isExist = itemArr.some(currentItem=>currentItem.name===cartItem.name)
  if(isExist){
     
  }
  else{
   const item = document.createElement('div')
  item.setAttribute('id',cartItem.id) 
  item.classList.add('cart-item')
  item.innerHTML = `
  <h4>${cartItem.name}</h4>
  <p>${cartItem.price}</p>
  <div class="items-count">
    <button class="plus">+</button>
    <p>1</p>
    <button class="minus">-</button>
  </div>
  <img src="/img/cart-remove.gif" class = "cart-remove">`
  cartSlider.prepend(item)
  }
 } 
  
 
 function removeCartItem(cont,itemId){
   itemArr = itemArr.filter((cont)=>cont.id!==itemId)
   localStorage.setItem('itemArr',JSON.stringify(itemArr))
   document.getElementById(itemId).remove()
 }

 let counter = 0;
 function countItems(){
  counter=counter+1
    itemCounter.style.visibility = 'visible'
    itemCounter.textContent = counter
}

function countRemoveItems(item){
  if(item.target.matches('.cart-item img')){
    counter=counter-1
    itemCounter.textContent = counter
    if(counter<=0){
      itemCounter.style.visibility = 'hidden'
      counter = 0
    }
  }
}

function count(itemArr){
for(let i = 0;i<=itemArr.length;i++){
  counter = i
  if(counter>0){
  itemCounter.textContent = counter
  itemCounter.style.visibility="visible"
  }
  else{
  itemCounter.style.visibility="hidden"
  }
 }
}

function calculateCartSum(btn){
  const cartSum = document.querySelector('.cart_sum')
  let price = Number(btn.target.previousElementSibling.previousElementSibling.textContent.slice(1))
  let cartSummary= Number(cartSum.textContent.slice(7));
  let sum = 0;
      
  sum = price + cartSummary
      
  cartSum.textContent = `Итого:$${sum}`
}

function calculateSum(itemArr){
const cart = document.querySelector('.cart_sum');
let price;
let sum = 0;

for(let i=0;i<itemArr.length;i++){
price = Number(itemArr[i].price.slice(1))
sum+= price
}
cart.textContent=`Итого:$${sum}`
}

function generateGUID(){
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
/*
let itemsQuantity = 1;
  if(itemArr.find((item)=>item.name===cartItem.name)){
    const quantity = Number(document.querySelector("items-count p").textContent)
  }

  <div class="items-count">
    <button class="plus">+</button>
    <p>1</p>
    <button class="minus">-</button>
  </div>*/
/*
  let isExist = false;
  for(let i=0;i<itemArr.length;i++){
    if(itemArr[i].name===cartItem.name){
      isExist = true;
    }
  }
  if(isExist){
    alert('hello')
  }
  else{
    const item = document.createElement('div')
    item.setAttribute('id',cartItem.id) 
    item.classList.add('cart-item')
    item.innerHTML = `
    <h4>${cartItem.name}</h4>
    <p>${cartItem.price}</p>
    <div class="items-count">
      <button class="plus">+</button>
      <p>1</p>
      <button class="minus">-</button>
    </div>
    <img src="/img/cart-remove.gif" class = "cart-remove">`
    cartSlider.prepend(item)
  }*/