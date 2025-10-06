const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

app.use(cors())
app.use(express.json()) // for parsing application/json

const recipes = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        category: "Italian",
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale",
            "4 large eggs",
            "100g Pecorino Romano cheese, grated",
            "2 cloves garlic",
            "Black pepper",
            "Salt"
        ],
        instructions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
            "While pasta cooks, cut pancetta into small cubes and cook in a large pan until crispy.",
            "In a bowl, whisk together eggs, grated cheese, and plenty of black pepper.",
            "When pasta is ready, reserve 1 cup of pasta water and drain the rest.",
            "Add hot pasta to the pan with pancetta and toss quickly.",
            "Remove from heat and immediately add egg mixture, tossing rapidly to create a creamy sauce.",
            "Add pasta water gradually if needed to achieve desired consistency.",
            "Serve immediately with extra cheese and black pepper."
        ]
    },
    {
        id: 2,
        name: "Chicken Tikka Masala",
        category: "Indian",
        ingredients: [
            "500g boneless chicken, cubed",
            "200ml plain yogurt",
            "2 tbsp tikka masala spice blend",
            "1 large onion, diced",
            "3 cloves garlic, minced",
            "1 inch ginger, grated",
            "400ml canned tomatoes",
            "200ml heavy cream",
            "2 tbsp vegetable oil",
            "Fresh cilantro",
            "Salt to taste"
        ],
        instructions: [
            "Marinate chicken pieces in yogurt and half the spice blend for at least 30 minutes.",
            "Heat oil in a large pan and cook marinated chicken until golden brown. Set aside.",
            "In the same pan, sauté onions until translucent, about 5 minutes.",
            "Add garlic, ginger, and remaining spices. Cook for 1 minute until fragrant.",
            "Add canned tomatoes and simmer for 10 minutes until sauce thickens.",
            "Return chicken to the pan and add cream. Simmer for 5 minutes.",
            "Season with salt and garnish with fresh cilantro.",
            "Serve hot with basmati rice or naan bread."
        ]
    },
    {
        id: 3,
        name: "Classic Caesar Salad",
        category: "Salad",
        ingredients: [
            "2 heads romaine lettuce, chopped",
            "1/2 cup grated Parmesan cheese",
            "1 cup croutons",
            "3 anchovy fillets",
            "2 cloves garlic",
            "1 egg yolk",
            "1 tbsp Dijon mustard",
            "3 tbsp lemon juice",
            "1/3 cup olive oil",
            "Black pepper"
        ],
        instructions: [
            "Wash and thoroughly dry romaine lettuce, then chop into bite-sized pieces.",
            "In a large bowl, mash anchovies and garlic into a paste using a fork.",
            "Whisk in egg yolk, Dijon mustard, and lemon juice until combined.",
            "Slowly drizzle in olive oil while whisking to create an emulsion.",
            "Add chopped romaine and toss well to coat with dressing.",
            "Sprinkle with Parmesan cheese and croutons.",
            "Season with freshly ground black pepper.",
            "Serve immediately while lettuce is crisp."
        ]
    },
    {
        id: 4,
        name: "Beef Tacos",
        category: "Mexican",
        ingredients: [
            "500g ground beef",
            "8 small corn tortillas",
            "1 onion, diced",
            "2 cloves garlic, minced",
            "1 tbsp chili powder",
            "1 tsp cumin",
            "1 tsp paprika",
            "1/2 cup beef broth",
            "1 tomato, diced",
            "1 cup shredded lettuce",
            "1 cup shredded cheese",
            "Sour cream",
            "Lime wedges"
        ],
        instructions: [
            "Heat a large skillet over medium-high heat and brown the ground beef.",
            "Add diced onion and garlic, cook until onion is translucent.",
            "Season with chili powder, cumin, paprika, salt, and pepper.",
            "Add beef broth and simmer until liquid reduces and flavors meld, about 5 minutes.",
            "Warm tortillas in a dry pan or microwave wrapped in damp paper towels.",
            "Fill each tortilla with seasoned beef mixture.",
            "Top with diced tomatoes, shredded lettuce, and cheese.",
            "Serve with sour cream and lime wedges on the side."
        ]
    },
    {
        id: 5,
        name: "Chocolate Chip Cookies",
        category: "Dessert",
        ingredients: [
            "225g all-purpose flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "225g butter, softened",
            "150g granulated sugar",
            "165g brown sugar",
            "2 large eggs",
            "2 tsp vanilla extract",
            "350g chocolate chips"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C) and line baking sheets with parchment paper.",
            "In a bowl, whisk together flour, baking soda, and salt. Set aside.",
            "In a large bowl, cream together softened butter and both sugars until fluffy.",
            "Beat in eggs one at a time, then add vanilla extract.",
            "Gradually mix in the flour mixture until just combined.",
            "Fold in chocolate chips until evenly distributed.",
            "Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.",
            "Bake for 9-11 minutes until edges are golden brown but centers still look slightly underbaked.",
            "Cool on baking sheet for 5 minutes before transferring to a wire rack."
        ]
    }
]

app.get('/', (req, res) => {
  res.send('Hello Express World!')
})


app.get('/recipes', (req, res) => {
    res.json(recipes)
})

app.post('/recipes,', (req, res) => {
    // we want to store the data from the POST to the server
    // and currently in our server, we do not have a database
    // instead we store the data in memory to the recipes array

    // 1. question? How to store the data?
    // 2. how do we get access to the data?
    console.log(req.get('Content-Type'))
    console.log(req.body);

    // we store the data to in memory array recipes, IF we are sure that the data
    // is in the correct format
    recipes.push(req.body);
    res.send("Yippikayjei");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
