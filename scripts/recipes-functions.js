'use strict'

const divEl = document.querySelector('#recipes')
const ingredientsEl = document.querySelector('#ingredients')

// Get recipes form localStorage
const getRecipes = () => {
   const recipes = localStorage.getItem('recipes')

   try {
      return recipes ? JSON.parse(recipes) : []
   } catch (e) {
      return []
   }
}

// To save the new version of the recipes array in the localStorage
const saveRecipes = (recipes) => {
   localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Setting up the subtitle text
const generateSubtitle = (ingredients) => {
   const existingIngredients = ingredients.filter((ingredient) => ingredient.have)
   const subtitle = document.createElement('p')

   if (!ingredients.length) {
      subtitle.textContent = 'There is no ingredients'
   } else if (existingIngredients.length === ingredients.length) {
      subtitle.textContent = 'You have all the ingredients'
   } else if (existingIngredients.length === 0) {
      subtitle.textContent = 'You have none of the ingredients'
   } else {
      subtitle.textContent = 'You have some of the ingredients'
   }

   return subtitle
}

// Create a recipe in the Main HTML page
const generateRecipes = (recipe) => {
   const recipeEl = document.createElement('div')
   const recipePar = document.createElement('p')
   const subtitle = generateSubtitle(recipe.ingredients)
   const button = document.createElement('button')

   // setting up the recipeEl 
   recipeEl.classList.add('list-item')

   // Setting up the title paragraph
   recipePar.textContent = recipe.title
   recipePar.classList.add('list-item__title')
   recipeEl.appendChild(recipePar)

   // include the subtitle 
   subtitle.classList.add('list-item__subtitle')
   recipeEl.appendChild(subtitle)

   // Button Set up
   button.textContent = 'Start Cooking'
   button.addEventListener('click', (e) => {
      location.assign(`edit.html#${recipe.id}`)
   })
   recipeEl.appendChild(button)

   // Put it into the DOM
   divEl.appendChild(recipeEl)
}

// Display every recipe in the recipes array and also render the right recipes when user search
const renderRecipes = (recipes, filters) => {
   const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

   divEl.innerHTML = ''

   if (filteredRecipes.length > 0) {
      filteredRecipes.forEach((recipe) => {
         generateRecipes(recipe)
      })
   } else {
      const emptyP = document.createElement('p')
      emptyP.textContent = 'No Recipes To Show!'
      emptyP.classList.add('empty')
      divEl.appendChild(emptyP)
   }
}

// Remove the ingredient from the recipes array
const removeIngredient = (labelId, ingredients) => {
   const ingredIndex = ingredients.findIndex((ingredient) => labelId === ingredient.id)

   if (ingredIndex > -1) {
      ingredients.splice(ingredIndex, 1)
      saveRecipes(recipes)
   }
}

// Change the ingredient status 
const checkIngredient = (labelId, ingredients) => {
   const findChecked = ingredients.find((ingredient) => labelId === ingredient.id)

   if (findChecked) {
      findChecked.have = !findChecked.have
   }
}

// Create an element for each ingredient in the ingredients array
const generateIngredients = (ingredients) => {
   const fragment = document.createDocumentFragment()
   ingredients.forEach((ingredient) => {
      const label = document.createElement('label')
      const divContainer = document.createElement('div')
      const checkbox = document.createElement('input')
      const small = document.createElement('small')
      const removeButton = document.createElement('span')

      // Setting id to the paragraph
      label.setAttribute('id', ingredient.id)

      // Setting checkbox
      checkbox.setAttribute('type', 'checkbox')
      // Make checkbox status equal to ingredient.have value
      checkbox.checked = ingredient.have
      // Change the ingredient.have value so the user can see the checkbox sign as checked or opposite
      checkbox.addEventListener('change', (e) => {
         checkIngredient(label.id, ingredients)
         saveRecipes(recipes)
      })
      divContainer.appendChild(checkbox)

      // Setting up ingredient text
      small.textContent = ingredient.name
      divContainer.appendChild(small)

      // Setting up container 
      divContainer.classList.add('ingred-container')
      label.appendChild(divContainer)

      // Setting button
      removeButton.textContent = 'remove'
      removeButton.addEventListener('click', (e) => {
         removeIngredient(label.id, ingredients)
         generateIngredients(recipe.ingredients)
      })

      label.appendChild(removeButton)
      fragment.appendChild(label)
   })

   ingredientsEl.innerHTML = ''

   ingredientsEl.appendChild(fragment) 
}