const imgLists = document.querySelectorAll(".phone-cont_main img")


for(let i = 0;i<imgLists.length;i++){
    imgLists[i].style.left = 100 * i + "%"
}

const gallery = document.querySelector(".phone-cont_gallery")

gallery.addEventListener("click",(event)=>{
if(event.target.matches("img")){
  const imgList = document.querySelectorAll(".phone-cont_gallery img")
  const imgArr = Array.from(imgList)
  let index = imgArr.indexOf(event.target)
  
  for(let img of imgLists){
  img.style.left = -100 * index + "%"
  index = index - 1
 }
  }
})


document.querySelector(".info-cont_figures").addEventListener("click",(event)=>{
if(event.target.closest("figure")){
 
selectColor(event.target.closest("figure"))
calculatePriceOfColor(event.target.closest("figure"))
  const figures = document.querySelectorAll("figure")
  for(let figure of figures){
     figure.style.border = "1px solid #0000001A"
   }
  event.target.closest("figure").style.border= "2px solid #FFCA00"
 }
})


document.querySelector(".info-cont_buttons").addEventListener("click",(event)=>{
if(event.target.matches(".info-cont_buttons button")){
  const btnList = document.querySelectorAll(".info-cont_buttons button")
  for(let btn of btnList){
   btn.style.border = "1px solid #0000001A"
  }
  event.target.style.border = "2px solid #FFCA00"
 }
})


function selectColor(eventTarget){
let color = eventTarget.dataset.color
const bigImgs = document.querySelectorAll(".phone-cont_main img")
const gallery = document.querySelectorAll(".phone-cont_gallery img")

for(let img of bigImgs){
   img.src = img.dataset[color]
  }
 
for(let img of gallery){
   img.src = img.dataset[color]
  }
}




function calculatePriceOfColor(eventTarget){
  let price = document.querySelector(".info-cont h2")
let p = Number(price.textContent.slice(2))
  if(eventTarget.dataset.color==="black"){
   p = 100
   price.textContent =`$ ${p}`
  }
  else if(eventTarget.dataset.color==="blue"){
  p = 150
  price.textContent = `$ ${p}`
  }
  else
  p = 200
  price.textContent = `$ ${p}` 
}


function calculatePriceOfConfig(eventTarget){
let price = document.querySelector(".info-cont h2")
let p = Number(price.textContent.slice(2))

if(event.target.datset.config==="low")
  if(p===150){
   }
}