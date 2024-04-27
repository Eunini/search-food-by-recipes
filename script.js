const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById("recipe-close-btn");
let searchInput = document.getElementById("search-input");


// event listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})

// get meal list that matches the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    // console.log(searchInputTxt);
    // ${searchInputTxt}
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = '';
        console.log(data)
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src= "${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                    `;
            });
            mealList.classList.remove("notfound");
        } else {
            html = "sorry we didn't find the meal!";
            mealList.classList.add("notfound");
        }

        mealList.innerHTML = html;
    });
}

// function to show meal recipe
function getMealRecipe(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains("recipe-btn")){
        let mealitem = e.target.parentElement.parentElement;
        // console.log(mealitem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealitem.dataset.id}`)
        .then(response => response.json())
        .then(data => MealRecipeModal(data.meals))
    }
}
function MealRecipeModal(meal){
    meal = meal[0];
    let html = ` <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank" rel="">Watch Video</a>
    </div>`;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}

// Event listener for keydown event
searchInput.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
      // Toggle visibility of search icon
      recipeCloseBtn.style.display = 'inline';
    }
  });