// 3ed18f7e
// let searchButton=document.querySelector("#search")
// searchButton.addEventListener('click',()=>{
// console.log('button pressed');
// sendApiRequest()
// })

// async function sendApiRequest(){
//     // let API_KEY="OEOTh3lAHUIrfDlfgy2NEnTccGfDaLFa4ovom7gJ"
//     let response=await fetch(`https://api.nasa.gov/planetary/apod?api_key=OEOTh3lAHUIrfDlfgy2NEnTccGfDaLFa4ovom7gJ`)
//     console.log(response);
//     let data=response.json()
//     console.log(data);
//     ApiData(data)
// }

// function ApiData(data){
// document.querySelector('#content').innerHTML=data.
// }

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('myfood');
const mealDetailsContent = document.querySelector('.myfood-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getFood);
mealList.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// geting food according our searches
function getFood(){
    let searchInputTxt = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "myfood-item" data-id = "${meal.idMeal}">
                        <div class = "myfood-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "myfood-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('blank');
        } else{
            html = "Sorry,try later!";
            mealList.classList.add('blank');
        }

        mealList.innerHTML = html;
    });
}

// get recipe of the food
function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodBox(data.meals));
    }
}



// create a box
function foodBox(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Follow the steps:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-link ">
            <a color="black" href = "${meal.strYoutube}" target = "_blank">Watch Recipe on YOUTUBE</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
