
const cart = document.querySelectorAll('.header__icons div')[0]
const cartSlider = document.querySelector('.card__slider')
const cartCloseBtn = document.querySelectorAll('.card__slider button')[0]
const toCartBtn = document.querySelectorAll('.card__slider button')[1]
const main = document.querySelector("main")
const itemCounter= document.querySelector('.items__amount')

let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []

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
    window.location.href = "../html/cart.html"
})

window.addEventListener("load",()=>{
    loadItems(itemArr)
    count(itemArr)
    calculateSum(itemArr)
})


main.addEventListener("click",(event)=>{
if(event.target.matches("[data-btn='buy']")){
        let itemName = event.target.parentElement.firstElementChild.textContent;
        let itemPrice = event.target.previousElementSibling.previousElementSibling.textContent;
        
        const item = {
          id:generateGUID(),
          name:itemName,
          price:itemPrice,
        }
        createCartItem(item)
        itemArr.push(item)
        localStorage.setItem('itemArr',JSON.stringify(itemArr))
        
        calculateSum(itemArr)
        countItems()
  }
})

main.addEventListener("click",(event)=>{
  if(event.target.matches("[data-spec='c33']")){
    window.location.href = "../html/item.html"
  }
})

cartSlider.addEventListener("click",(item)=>{
 if(item.target.matches('img')){
  itemArr = itemArr.filter((elem)=>elem.name!==item.target.closest('.cart-item').dataset.name)
  localStorage.setItem('itemArr',JSON.stringify(itemArr))
  item.target.closest('.cart-item').remove()
   
  countItems()
  calculateSum(itemArr)
 }
})

cartSlider.addEventListener("click",(event)=>{
  if(event.target.matches(".plus")){
    event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) + 1
    const container = event.target.parentElement.parentElement

    const item = {
      id:generateGUID(),
      name:container.dataset.name,
      price:container.firstElementChild.nextElementSibling.textContent
    }
    itemArr.push(item)
    localStorage.setItem('itemArr',JSON.stringify(itemArr))
    countItems()
    calculateSum(itemArr)
  }
})

cartSlider.addEventListener("click",(event)=>{
  if(event.target.matches(".minus")){
    let itemsAmount = Number(event.target.previousElementSibling.textContent)
    if(itemsAmount>1){
      event.target.previousElementSibling.textContent = Number(event.target.previousElementSibling.textContent) - 1
      removeItem(itemArr,event.target.parentElement.parentElement.dataset.name)
      countItems()
      calculateSum(itemArr)
    }
    else{
      let cartItem = event.target.parentElement.parentElement
      cartItem.remove()
      removeItem(itemArr,event.target.parentElement.parentElement.dataset.name)
      countItems()
      calculateSum(itemArr)
      
    }
  }
})


function createCartItem(cartItem){
  let isExist = itemArr.some(currentItem=>currentItem.name===cartItem.name)
  if(isExist){
    let item = itemArr.find(item=>item.name===cartItem.name)
    let divList = document.getElementsByClassName("cart-item")
    let divArr = Array.from(divList)
    let div = divArr.find(elem=>elem.dataset.name===item.name)
    if(div){
      let counterElem = div.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling
      let counter = Number(counterElem.textContent) + 1
      counterElem.textContent = counter
    }
  }
  else{
   const item = document.createElement('div')
  item.setAttribute('id',cartItem.id) 
  item.setAttribute('data-name',cartItem.name)
  item.classList.add('cart-item')
  item.innerHTML = `
  <h4>${cartItem.name}</h4>
  <p>${cartItem.price}</p>
  <div class="items-count">
    <button class="plus">+</button>
    <p>1</p>
    <button class="minus">-</button>
  </div>
  <img src="../img/cart-delete.svg" class = "cart-remove">`
  cartSlider.prepend(item)
  }
 } 
  
 function removeItem(itemArr,itemName){
  let elemToRemove = itemArr.find(elem =>elem.name === itemName)
  let elemIndex = itemArr.indexOf(elemToRemove)
  if(elemIndex>=0){
    itemArr.splice(elemIndex,1)
  }
   localStorage.setItem('itemArr',JSON.stringify(itemArr))
 }
 
 function countItems(){
    if(itemArr.length!==0){
      itemCounter.textContent = itemArr.length
      itemCounter.style.visibility = 'visible'
    }
    else{
      itemCounter.style.visibility = 'hidden'
    }
    
}

function count(itemArr){
for(let i = 0;i<=itemArr.length;i++){
  if(i>0){
  itemCounter.textContent = i
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
  let sum = price + cartSummary

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
cart.textContent=`Total:$${sum}`
}

function loadItems(itemArr){
  if(itemArr.length!==0){
    const countByName = itemArr.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1;
      return acc;
  }, {});
    let uniqueArr =[]

    itemArr.forEach(obj => {
      if (!uniqueArr.some(item => item.name === obj.name)) {
      uniqueArr.push(obj);
    }
  })
  let count = 1;
  for(let i = 0;i<uniqueArr.length;i++){
    for(let j in countByName){
      if(uniqueArr[i].name===j){
        count = countByName[j]
      }
    }
    const item = document.createElement('div')
    item.setAttribute('id',uniqueArr[i].id) 
    item.setAttribute('data-name',uniqueArr[i].name)
    item.classList.add('cart-item')
    item.innerHTML = `
    <h4>${uniqueArr[i].name}</h4>
    <p>${uniqueArr[i].price}</p>
    <div class="items-count">
      <button class="plus">+</button>
      <p>${count}</p>
      <button class="minus">-</button>
    </div>
    <img src="/img/cart-delete.svg" class = "cart-remove">`
    cartSlider.prepend(item)
    }
  }
}

function generateGUID(){
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
