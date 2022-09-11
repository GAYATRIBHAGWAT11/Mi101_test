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

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
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
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


