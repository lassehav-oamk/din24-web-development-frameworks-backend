const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Initialize database
const db = new Database('recipes.db')

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
  )
`)

app.get('/', (req, res) => {
  res.send('Hello Express World with SQLite Database!')
})

// Get all recipes
// Example: GET http://localhost:3000/recipes
app.get('/recipes', (req, res) => {
  const recipes = db.prepare('SELECT * FROM recipes').all()

  // Parse JSON strings back to arrays
  const parsedRecipes = recipes.map(recipe => ({
    ...recipe,
    ingredients: JSON.parse(recipe.ingredients),
    instructions: JSON.parse(recipe.instructions)
  }))

  res.json(parsedRecipes)
})

// Get recipe by ID
// Example: GET http://localhost:3000/recipes/1
app.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id)

  if (recipe) {
    res.json({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions)
    })
  } else {
    res.status(404).json({ error: 'Recipe not found' })
  }
})

// Add new recipe
// Example: POST http://localhost:3000/recipes
// Body: {
//   "name": "Pancakes",
//   "category": "Breakfast",
//   "ingredients": ["2 cups flour", "2 eggs", "1 cup milk", "2 tbsp sugar", "1 tsp baking powder"],
//   "instructions": ["Mix dry ingredients", "Add wet ingredients", "Cook on griddle"]
// }
app.post('/recipes', (req, res) => {
  const { name, category, ingredients, instructions } = req.body

  const insert = db.prepare(`
    INSERT INTO recipes (name, category, ingredients, instructions)
    VALUES (?, ?, ?, ?)
  `)

  const result = insert.run(
    name,
    category,
    JSON.stringify(ingredients),
    JSON.stringify(instructions)
  )

  const newRecipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(result.lastInsertRowid)

  res.status(201).json({
    ...newRecipe,
    ingredients: JSON.parse(newRecipe.ingredients),
    instructions: JSON.parse(newRecipe.instructions)
  })
})

// Update recipe
// Example: PUT http://localhost:3000/recipes/1
// Body: {
//   "name": "Updated Recipe Name",
//   "category": "Italian",
//   "ingredients": ["ingredient 1", "ingredient 2"],
//   "instructions": ["step 1", "step 2"]
// }
app.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, category, ingredients, instructions } = req.body

  const update = db.prepare(`
    UPDATE recipes
    SET name = ?, category = ?, ingredients = ?, instructions = ?
    WHERE id = ?
  `)

  const result = update.run(
    name,
    category,
    JSON.stringify(ingredients),
    JSON.stringify(instructions),
    id
  )

  if (result.changes > 0) {
    const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(id)
    res.json({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions)
    })
  } else {
    res.status(404).json({ error: 'Recipe not found' })
  }
})

// Delete recipe
// Example: DELETE http://localhost:3000/recipes/1
app.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const deleteStmt = db.prepare('DELETE FROM recipes WHERE id = ?')
  const result = deleteStmt.run(id)

  if (result.changes > 0) {
    res.status(204).send()
  } else {
    res.status(404).json({ error: 'Recipe not found' })
  }
})

app.listen(port, () => {
  console.log(`Recipe server with SQLite listening on port ${port}`)
})