'use strict'

let recipes = getRecipes()

const filters = {
   searchText: ''
}

const recipesDiv = document.querySelector('#recipes')
const addRecipe = document.querySelector('#add')
const searchInput = document.querySelector('#search')

addRecipe.addEventListener('click', (e) => {
   e.preventDefault()
   const id = uuidv4()

   recipes.push({
      id: id,
      title: '',
      steps: '',
      ingredients: []
   })
   saveRecipes(recipes)
   location.assign(`edit.html#${id}`)
})

renderRecipes(recipes, filters)

searchInput.addEventListener('input', (e) => {
   filters.searchText = e.target.value
   renderRecipes(recipes, filters)
})
