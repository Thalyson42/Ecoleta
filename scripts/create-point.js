function populateUfState() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then((res) => { return res.json() })
    .then((states) => {

      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUfState()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`
  citySelect.disabled = true;

  const stateInput = document.querySelector("input[name=state]")
  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const idState = event.target.value
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idState}/municipios`

  fetch(url)
    .then((res) => { return res.json() })
    .then((cities) => {

      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false
    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

const itemList = document.querySelectorAll(".item-grid li")
const collectedItems = document.querySelector("input[name=items]")

for (item of itemList) {
  item.addEventListener("click", handleItemSelect)
}

let selectedItems = []

function handleItemSelect(event) {
  const itemLi = event.target

  itemLi.classList.toggle("selected")

  const itemLiId = itemLi.dataset.id

  //verificar se ja foi selecionado
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemLiId
    return itemFound
  })

  //Se já foi selecionado
  if (alreadySelected >= 0) {
    // remover da lista
    const itemsRemoved = selectedItems.filter((item) => {
      //Se o resultado for falso, o item será removido
      const itemFound = item != itemLiId
      return itemFound
    })
    //atualizar selectedItems com os itens removidos
    selectedItems = itemsRemoved
  } else {
    //adicionar na lista de selecionado
    selectedItems.push(itemLiId)
  }

  collectedItems.value = selectedItems
}