document.addEventListener('DOMContentLoaded',()=>{
    let cookieArr = document.cookie.split(";")
    let hasCookie = cookieArr.some(elem => elem.includes("id"))
    if(!hasCookie){
    const array = new Uint32Array(1);
    let value = self.crypto.getRandomValues(array);
  
    document.cookie = `id=${value[0]};path=/;max-age=86400;`
    let modalWindow = document.createElement("div")
    modalWindow.classList.add("modal")
    modalWindow.innerHTML = `
    <div class="modal__confirm">
        <div class="modal__wrapper">
            <img class="modal__cookie" src="/img/cookie.svg">
            <img class="modal__cross" src="/img/cross-icon.svg">
        </div>
        <p class="modal__appeal">We use cookie to <br>
        improve your user <br> experience.</p>
        <button class="modal__button"> I Like Cookies </button> 
    </div>`

    setTimeout(()=>{
        document.body.append(modalWindow)
    },1500)
  }
})

document.addEventListener("click",(event)=>{
    if(event.target.matches(".modal__button") || event.target.matches(".modal__cross")){
        event.target.closest(".modal").style.display = "none"
    }
})


