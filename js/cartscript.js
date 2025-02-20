const cartContainer = document.querySelector("main .container")


window.addEventListener('storage',(event)=>{
    const cartContainer = document.querySelector("main .container")
    const items = document.querySelectorAll(".cart-item")
    let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
      if(event.key === "itemArr"){
        calculateSum(itemArr)
        let divArr = Array.from(items)
        let div = divArr.find(elem=>elem.dataset.name ===  itemArr[itemArr.length-1].name)
        if(div){
          let counterElem = div.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling
          counterElem.textContent = Number(counterElem.textContent) + 1
        }
        else{
          createCartItem(cartContainer,itemArr)
        }
      }
})

window.addEventListener('load',()=>{
  let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
  loadItems(itemArr)
  calculateSum(itemArr)
})

cartContainer.addEventListener("click",(event)=>{
  let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
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
    calculateSum(itemArr)
  }
})

cartContainer.addEventListener("click",(event)=>{
  let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
  if(event.target.matches(".minus")){
    let itemsAmount = Number(event.target.previousElementSibling.textContent)
    if(itemsAmount>1){
      event.target.previousElementSibling.textContent = Number(event.target.previousElementSibling.textContent) - 1
      removeItem(itemArr,event.target.parentElement.parentElement.dataset.name)
      calculateSum(itemArr)
    }
    else{
      let cartItem = event.target.parentElement.parentElement
      cartItem.remove()
      removeItem(itemArr,event.target.parentElement.parentElement.dataset.name)
      calculateSum(itemArr)
    }
  }
})


cartContainer.addEventListener("click",(item)=>{
  let itemArr = JSON.parse(localStorage.getItem("itemArr")) || []
  if(item.target.matches('img')){
   itemArr = itemArr.filter((elem)=>elem.name!==item.target.closest('.cart-item').dataset.name)
   localStorage.setItem('itemArr',JSON.stringify(itemArr))
   item.target.closest('.cart-item').remove()

   calculateSum(itemArr)
  }
 })

function createCartItem(container,itemArr){
      const item = document.createElement('div')
      item.setAttribute('id',itemArr[itemArr.length-1].id) 
      item.setAttribute('data-name',itemArr[itemArr.length-1].name)
      item.classList.add('cart-item')
      item.innerHTML = `
      <h4>${itemArr[itemArr.length-1].name}</h4>
      <p>${itemArr[itemArr.length-1].price}</p>
      <div class="items-count">
        <button class="plus">+</button>
        <p>${1}</p>
        <button class="minus">-</button>
      </div>
      <img src="/img/cart-delete.svg" class = "cart-remove">`
      container.prepend(item)
}

function loadItems(itemArr){
  const cartContainer = document.querySelector("main .container")
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
    cartContainer.prepend(item)
    }
  }
  return
}

function calculateSum(itemArr){
  const cartSum = document.querySelector('.footer__cont-sum');
  let price;
  let sum = 0;
  
  for(let i=0;i<itemArr.length;i++){
  price = Number(itemArr[i].price.slice(1))
  sum+= price
  }
  cartSum.textContent=`Total:$${sum}`
}

function removeItem(itemArr,itemName){
  let elemToRemove = itemArr.find(elem =>elem.name === itemName)
  let elemIndex = itemArr.indexOf(elemToRemove)
  if(elemIndex>=0){
    itemArr.splice(elemIndex,1)
  }
   localStorage.setItem('itemArr',JSON.stringify(itemArr))
 }


function generateGUID(){
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
