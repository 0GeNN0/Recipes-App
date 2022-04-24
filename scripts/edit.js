const titleInput = document.querySelector('#title')
const textArea = document.querySelector('#steps')
const ingredientInput = document.querySelector('#ingred-name')
const ingredientButton = document.querySelector('#add-ingredient')
const deleteButton = document.querySelector('#delete')
const recipeId = location.hash.substring(1)
let recipes = getRecipes()
const recipe = recipes.find((recipe) => recipe.id === recipeId)

titleInput.value = recipe.title
textArea.value = recipe.steps

if (recipe.ingredients.length > 0) {
   generateIngredients(recipe.ingredients)
} else {
   const emptyMessage = document.createElement('p')
   emptyMessage.classList.add('empty')
   emptyMessage.textContent = 'Please Enter Ingredient To Show'
   ingredientsEl.appendChild(emptyMessage)
}


titleInput.addEventListener('change', (e) => {
   e.preventDefault()
   recipe.title = e.target.value
   saveRecipes(recipes)
})

textArea.addEventListener('change', (e) => {
   e.preventDefault()
   recipe.steps = e.target.value
   saveRecipes(recipes)
})

ingredientButton.addEventListener('click', (e) => {
   e.preventDefault()
   if (ingredientInput.value !== '') {
      recipe.ingredients.push({
         id: uuidv4(),
         name: ingredientInput.value.trim(),
         have: false
      })  
      generateIngredients(recipe.ingredients)
      saveRecipes(recipes)
   }

   ingredientInput.value = ''
})

deleteButton.addEventListener('click', (e) => {
   const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId)

   if(recipeIndex > -1) {
      recipes.splice(recipeIndex, 1)
   }
   saveRecipes(recipes)
   location.assign('index.html')
})
