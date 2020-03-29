document.addEventListener("DOMContentLoaded", function ()
{

// main app view aside menu

const $liList = document.querySelectorAll(".aside-menu li");

for (let i = 0; i < $liList.length; i++) {

    $liList[i].querySelector("a").addEventListener("mouseenter", function () {
        for (let j = 0; j < $liList.length; j++) {
            $liList[j].querySelector("i").classList.remove("fas");
            $liList[j].querySelector("i").classList.remove("fa-chevron-right");
            $liList[j].querySelector("a").classList.remove("border-left");
        }

        $liList[i].querySelector("i").classList.add("fas");
        $liList[i].querySelector("i").classList.add("fa-chevron-right");
        $liList[i].querySelector("a").classList.add("border-left");
    });

}

// saving name

    const $form = document.querySelector(".first-visit-form");
    const $nameInput = $form.querySelector('input[name="name"]');
    const $nameSubmit = $form.querySelector('button');
    const $nameOutput = document.querySelector('.name');
    const $loginIcon =  document.querySelector(".login-name").querySelector("i");
    const $defaultNameOutput = "Imię";
    const $firstVisitPanel = document.querySelector('.first-visit');
    const $mainPanel = document.querySelector('.main-panel');

    const $logOutDiv = document.querySelector(".login-name").querySelector(".logout");
    const $resetLocalStorage = document.querySelector(".login-name").querySelector(".reset-localStorage");

    $logOutDiv.style.display = "none";
    $resetLocalStorage.style.display = "none";

    let currentNameIndex;

    function checkingCurrentIndex() {
        if(localStorage.getItem("currentNameIndex") !== null)
        {
            currentNameIndex = localStorage.getItem("currentNameIndex");
        }
        else
        {
            currentNameIndex = -1
        }
    }

    function setName() {

        checkingCurrentIndex();
        if(currentNameIndex >= 0)
        {
            const users = JSON.parse(localStorage.getItem("users"));
            $nameOutput.innerText = users[currentNameIndex].name;
        }
        notificationCounter();
    }

    setName();


    $nameOutput.addEventListener("mouseenter", function ()
    {
        $resetLocalStorage.style.display = "block";
    });
    $nameOutput.addEventListener("mouseleave", function ()
    {
        $resetLocalStorage.style.display = "none";
    });


console.log(localStorage);

// checking if is "log in"

    function checkName()
    {
        if ($nameOutput.innerText.trim() !== $defaultNameOutput.trim() && $nameOutput.innerText.length > 0 && currentNameIndex !== -1) // if name exists in localStorage
        {
            $firstVisitPanel.style.display = "none";
            $mainPanel.style.display = "block";

            $loginIcon.addEventListener("mouseenter", function ()
            {
                $logOutDiv.style.display = "block";
            });

            $loginIcon.addEventListener("mouseleave", function ()
            {
                $logOutDiv.style.display = "none";
            });
        }
        else // if name doesn't exist in local Storage
        {
            $firstVisitPanel.style.display = 'flex';
            $mainPanel.style.display = "none";
            $logOutDiv.style.display = "none";
            currentNameIndex = -1;
            localStorage.setItem("currentNameIndex", JSON.stringify(currentNameIndex));
        }
    }

    checkName();


// checking if name exist in local Storage and "login"/"register"

    $nameSubmit.addEventListener('click', function storeName(e) {
        e.preventDefault();

        let users = JSON.parse(localStorage.getItem("users"));
        let savedName = "";

        if(parseInt(localStorage.length) !== 1)
        {
            for (let i = 0; i < users.length ; i++)
            {
                if (users[i].name.trim() === $nameInput.value.trim() ) // if name exists in localStorage
                {
                    savedName = users[i].name;
                    currentNameIndex = i;
                }
            }

            if (savedName) // if name exists in localStorage
            {
                $nameOutput.innerHTML = savedName;
            }

            else // if name doesn't exist in local Storage
            {
                $nameOutput.innerHTML = $nameInput.value;

                let freeSpace = "";

                for (let i = 0; i < users.length; i++) {

                    if(users[i].name === null)
                    {
                        freeSpace = i;
                    }
                }

                if(freeSpace)
                {
                    users[freeSpace] = {};
                    users[freeSpace].name = $nameInput.value;
                    currentNameIndex = freeSpace;
                }
                else
                {
                    users[users.length] = {};
                    users[users.length -1].name = $nameInput.value;
                    currentNameIndex = (users.length -1);
                }
            }
        }
        else
        {
            users = [];
            users[0] = {};
            users[0].name = $nameInput.value;
            $nameOutput.innerHTML = $nameInput.value;
            currentNameIndex = 0;
        }


        localStorage.setItem("users", JSON.stringify(users));

        $nameInput.value = "";

        checkName();
        notificationCounter();

        localStorage.setItem("currentNameIndex", JSON.stringify(currentNameIndex));
        return currentNameIndex;
    });


    // add_recipe & add_plan widgets


    document.getElementById('add-recipe').addEventListener('click', function(){
        document.querySelector('.add-recipe-modal').style.display = 'flex';
    });

    document.getElementById('add-plan').addEventListener('click', function () {
        document.querySelector('.add-plan-modal').style.display = 'flex'
    });

    //closing add_new_plan and add_new_recipe window


    document.getElementById('exit-plan-button').addEventListener('click', function () {
        document.querySelector('.add-plan-modal').style.display = 'none'
    });

    document.getElementById('exit-recipe-button').addEventListener('click', function () {
        document.querySelector('.add-recipe-modal').style.display = 'none'
    });


    // closing the widgets notifications

    const $exitFirst = document.querySelector(".exit-first");
    const $exitSecond = document.querySelector(".exit-second");
    const $exitThird = document.querySelector(".exit-third");

    function closeInfoOne() {
        $exitFirst.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoTwo() {
        $exitSecond.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    function closeInfoThree() {
        $exitThird.addEventListener("click", function (e) {
            this.parentNode.classList.add('close');
        })
    }
    closeInfoOne();
    closeInfoTwo();
    closeInfoThree();


// to show all the recipes (recipe panel)

    const $recipeName = document.getElementById('recipe-name');
    const $recipeDescription = document.getElementById('recipe-description');

    const $recipeIngredientsText = document.getElementById('ingredients');
    const $recipeIngredientsButton = document.getElementById('add-ingredients');
    const $recipeIngredientsList = document.getElementById('ingredients-list');

    const $recipeInstructionsText = document.getElementById('instructions');
    const $recipeInstructionsButton = document.getElementById('add-instructions');
    const $recipeInstructionsList = document.getElementById('instructions-list');

    const $savingButton = document.getElementById('exit-recipe-button');
    const $allRecipesContainer = document.querySelector('.table-content');

    const newRecipe = {
        id: "",
        title: "",
        description: "",
        instructions: [],
        ingredients: []
    };

    // ingredients

    function addIngredient(ingredient) {
        const $newLi = document.createElement("li");
        const $buttons = `<div class="action-btns">
                            <button type="button" class="edit-ingredients action-btn">
                                <i class="far fa-edit"></i></i> 
                            </button>
                            <button type="button" class="remove-ingredients action-btn">
                                 <i class="far fa-trash-alt"></i> 
                            </button>
                           </div>`;

        let $ingredient = `<div class="ingredient-content-text">
                                ${ingredient}
                           </div>`;

        $newLi.innerHTML = `<div class="ingredients-content">
                                ${$ingredient} ${$buttons}
                            </div>`;

        $recipeIngredientsList.appendChild($newLi);
    }

    $recipeIngredientsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.ingredients.push($recipeIngredientsText.value);
        addIngredient($recipeIngredientsText.value);

        $recipeIngredientsText.value = "";
        removeIngredients();
    });

    // remove instruction

    function removeIngredients()
    {
        const $ingredientsLiDiv = document.querySelectorAll(".ingredients-content");

        for (let i = 0; i < $ingredientsLiDiv.length; i++)
        {
            let $ingredientsRemoveBtn = $ingredientsLiDiv[i].querySelector(".remove-ingredients");

            $ingredientsRemoveBtn.addEventListener("click", function (e)
            {
                e.preventDefault();
                $ingredientsLiDiv[i].parentElement.remove();
            });
        }
    }


    //instructions

    function addInstruction(instruction) {
        const $newLi = document.createElement("li");
        const $buttons = `<div class="action-btns">
                            <button type="button" class="edit-instructions action-btn">
                                <i class="far fa-edit"></i></i> 
                            </button>
                            <button type="button" class="remove-instructions action-btn">
                                 <i class="far fa-trash-alt"></i> 
                            </button>
                           </div>`;

        let $instruction = `<div class="instruction-content-text">
                                ${instruction}
                            </div>`;

        $newLi.innerHTML = `<div class="instructions-content">
                                ${$instruction} ${$buttons}
                            </div>`;

        $recipeInstructionsList.appendChild($newLi);
    }

    $recipeInstructionsButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.instructions.push($recipeInstructionsText.value);
        addInstruction($recipeInstructionsText.value);

        $recipeInstructionsText.value = "";
        removeInstruction();
    });

// remove instruction

    function removeInstruction()
    {
        const $instructionsLiDiv = document.querySelectorAll(".instructions-content");

        for (let i = 0; i < $instructionsLiDiv.length; i++)
        {
            let $instructionRemoveBtn = $instructionsLiDiv[i].querySelector(".remove-instructions");

            $instructionRemoveBtn.addEventListener("click", function (e)
            {
                e.preventDefault();
                $instructionsLiDiv[i].parentElement.remove();
            });
        }
    }



// saving the recipes

    $savingButton.addEventListener("click", function (e) {
        e.preventDefault();

        newRecipe.title = $recipeName.value;
        newRecipe.description = $recipeDescription.value;
        saveRecipeToLocalStorage(newRecipe);

        document.querySelector('.add-recipe-modal').style.display = 'none';
        $mainPanel.style.display = 'flex';

        notificationCounter();

    });

// saving recipes to local storage

    function saveRecipeToLocalStorage(newObject)
    {
        let users = JSON.parse(localStorage.getItem("users"));

        if (users[currentNameIndex].recipes !== undefined) {
            newObject.id = users[currentNameIndex].recipes.length + 1;
            users[currentNameIndex].recipes.push(newObject);
        }
        else
        {
            newObject.id = 1;
            users[currentNameIndex].recipes = [];
            users[currentNameIndex].recipes.push(newObject);
        }

        localStorage.setItem("users", JSON.stringify(users));

        alert("Przepis zapisany");
        clearNewRecipeData();
    }

    function clearNewRecipeData()
    {
        $recipeInstructionsList.innerHTML = '';
        $recipeIngredientsList.innerHTML = '';
        $recipeDescription.value = '';
        $recipeName.value = '';
    }

// cleaning the localStorage

    $nameOutput.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared

        if (localStorage.getItem("savedName") != null)
        {
            localStorage.removeItem("savedName");
            location.reload();
            localStorage.clear();
            $allRecipesContainer.innerHTML = "";
        }
        else
        {
            $firstVisitPanel.style.display = 'block';
            location.reload();
            localStorage.clear();
        }

        checkName();

    });

// "log out"

    $loginIcon.addEventListener("click", function () { // when clicking on the name, the local Storage is cleared

        $nameOutput.innerHTML = $defaultNameOutput;

        for (let i = 0; i < $liList.length; i++) {
            $liList[i].querySelector("i").classList.remove("fas");
            $liList[i].querySelector("i").classList.remove("fa-chevron-right");
            $liList[i].querySelector("a").classList.remove("border-left");
        }

        $liList[0].querySelector("i").classList.add("fas");
        $liList[0].querySelector("i").classList.add("fa-chevron-right");
        $liList[0].querySelector("a").classList.add("border-left");

        checkName();

    });

/// notification counter (widget)

    function notificationCounter()
    {
        if (parseInt(currentNameIndex) !== -1)
        {
            checkName();

            let users = JSON.parse(localStorage.getItem("users"));
            const $recipeCounterText = document.querySelector('.notification-counter');

            if (typeof(users[currentNameIndex].recipes) === "undefined") {
                $recipeCounterText.innerText = "Nie masz jeszcze żandych przepisów";
            }
            else if (users[currentNameIndex].recipes.length === 1)
            {
                $recipeCounterText.innerText = "Na razie masz tylko 1 przepis";
            }
            else if (users[currentNameIndex].recipes.length > 1 && users[currentNameIndex].recipes.length < 5)
            {
                $recipeCounterText.innerText = `Masz już ${users[currentNameIndex].recipes.length} przepisy`;
            }
            else
            {
                $recipeCounterText.innerText = `Masz już ${users[currentNameIndex].recipes.length} przepisów, nieźle!`;
            }
        }
    }


// new plan save

    const $savePlanButton = document.querySelector("#exit-plan-button"); //przycisk zapisz i zamknij

    const newWeekPlan = {
        id: null,
        weekPlanName: "",
        weekPlanDescription: "",
        weekPlanByDay: [],
    };


    function saveNewWeekPlanToLocalStorage(newObject)
    {
        let dataFromLocalStorage = [];

        if(localStorage.getItem("weekPlan") != null)
        {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("weekPlan"));
            dataFromLocalStorage.push($newWeekPlan);

            localStorage.setItem("weekPlan", JSON.stringify(dataFromLocalStorage));
        }
        else
        {
            dataFromLocalStorage.push($newWeekPlan);

            localStorage.setItem("weekPlan", JSON.stringify(dataFromLocalStorage));
        }

        alert("Plan został dodany do LocalStorage");
    }


    $savePlanButton.addEventListener("click", function (e)
    {
        e.preventDefault();

        const $planName = document.querySelector("#plan-name");
        const $planDescription = document.querySelector("#plan-description");
        const $weekNumber = document.querySelector("#week-number");

        const $dishesList = document.querySelectorAll("option"); //lista wybranych opcji z tabeli z posiłkami

        const weekPlanArray = [];  //tablica zawierająca tablice dishArray
        const dailyDishesArray = [];  //tablica z posiłkami na dany dzień


        // for (let i = 0; i < dishesList.length; i+5)
        // {
        //     for (let j = i; j < 5; j++)
        //     {
        //         dailyDishesArray.push(dishesList[j])
        //     }
        //     weekPlanArray.push(dailyDishesArray);
        // }

        weekPlanArray.push(1); // do testów
        weekPlanArray.push(2); // do testów

        newWeekPlan.id = $weekNumber.value;
        newWeekPlan.weekPlanName = $planName.value;
        newWeekPlan.weekPlanDescription = $planDescription.value;
        newWeekPlan.weekPlanByDay = weekPlanArray;

        const errors = [];

        if (newWeekPlan.id === null)
        {
            errors.push("nie podałeś numeru tygodnia");
        }
        else if (JSON.parse(localStorage.getItem("weekPlan")).id === newWeekPlan.id)
        {
            errors.push("plan na podany numer tygodnia już istnieje");
        }
        else if (weekPlanArray.length < 1)
        {
            errors.push("nie wybrałeś żadnych przepisów");
        }
        else if (newWeekPlan.weekPlanName === "")
        {
            errors.push("nie podałeś nazwy planu");
        }
        else if (newWeekPlan.weekPlanDescription === "")
        {
            errors.push("nie podałeś opisu do planu");
        }
        else
        {
            saveNewWeekPlanToLocalStorage(newWeekPlan);
        }

        if (errors.length > 0)
        {
            alert(errors);
        }
    });

});