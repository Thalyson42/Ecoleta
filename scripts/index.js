const searchButton = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const fechar = document.querySelector("#modal a")

searchButton.addEventListener("click", () => {
  modal.classList.remove("hide")
})

fechar.addEventListener("click", () => {
  modal.classList.add("hide")
})