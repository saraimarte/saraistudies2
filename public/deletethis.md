---
import '../../../styles/Global.css';

const costs = [
      {
        "name": "Cleaning Supplies",
        "answer": ["Operational"]
      },
      {
        "name": "Office Supplies",
        "answer": ["Operational"]
      },
      {
        "name": "Cleaning Supplies for Plant",
        "answer": ["Manufacturing"]
      },
      {
        "name": "Steel for Cars",
        "answer": ["Manufacturing"]
      },
    ];

const randomIndex = 0;

---

<div class="container" x-data="{ open: false }" data-random-index={randomIndex}>
    <div class="a">
        {randomIndex !== null ? (
            <div>
                <p class="selected">
                    {costs[randomIndex].name}
                </p>
            </div>
        ) : (
            <p>No more items to select</p>
        )}
    </div>
    <form class="b">
        <div class="left">
            <div class="options">
                <input class="option" type="radio" id="operational" name="classA" value="Operational">
                <label for="operational">Operational</label><br>
            </div>
            <div class="options">
                <input class="option" type="radio" id="manufacturing" name="classA" value="Manufacturing">
                <label for="manufacturing">Manufacturing</label><br>
            </div>
        </div>
    </form>

    <div class="c">
        <button @click="open = ! open" class="controls question" id="hint"> Hint </button>
        <button class="controls leftBtn" id="checkButton"> Check</button>
        <button class="controls" id="solution"> </button>
        <button class="controls" id="restart"> Restart </button>
        <button class="controls" id="nextBtn">Next</button>
    </div>

    <div x-show="open" class="modal">hello</div>
</div>

<script>
    const checkButton = document.getElementById("checkButton");
    const nextButton = document.getElementById("nextBtn");
    const controls = document.querySelector(".controls");
    const restartButton = document.getElementById("restart");
    const hint = document.getElementById("hint");

    const costs = [
        {
            "name": "Cleaning Supplies",
            "answers": ["Operational"]
        },
        {
            "name": "Office Supplies",
            "answers": ["Operational"]
        },
        {
            "name": "Cleaning Supplies for Plant",
            "answers": ["Manufacturing"]
        },
        {
            "name": "Steel for Cars",
            "answers": ["Manufacturing"]
        },
    ];

    let chosenIndices = [0];
    let costChosen = 0; // Initialize the index tracker with 0 for the initial prompt

    function getRandomIndex() {
        // Generate a random index excluding the current ones and past ones
        let availableIndices = Array.from({ length: costs.length }, (_, index) => index)
            .filter(index => !chosenIndices.includes(index) && index !== costChosen);

        if (availableIndices.length === 0) {
            // No more prompts available
            const checkButton = document.getElementById("checkButton");
            const nextButton = document.getElementById("nextBtn");
            const restartButton = document.getElementById("restart");
            const hint = document.getElementById("hint");

            restartButton.style.display = "block";
            nextButton.style.display = "none";
            hint.style.display = "none";
            checkButton.style.display = "none";

            restartButton.addEventListener("click", () => {

                nextButton.style.display = "block";
                restartButton.style.display = "none";
                nextButton.style.display = "block";
                hint.style.display = "block";
                checkButton.style.display = "block";

                costChosen = null;
                chosenIndices = [0];
                const radioA = document.querySelector('input[name="classA"]:checked') as HTMLInputElement;

                if (radioA) {
                    radioA.checked = false;
                }

                nextButton.style.backgroundColor = "rgb(195, 199, 199)";
                
            })

            return null;
        }

        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        chosenIndices.push(randomIndex);
        return randomIndex;
    }

    function updateUI() {
        // Display the current cost based on the random index
        const promptElement = document.querySelector('.a p.selected');
        if (promptElement) {
            promptElement.textContent = costs[costChosen].name;
        }
    }

    // When the user hits the next button everything will reset to default.
    function resetUI() {
        const radioA = document.querySelector('input[name="classA"]:checked') as HTMLInputElement;

        // Unselect all options
        if (radioA) {
            radioA.checked = false;
        }

        // Change Next Btn back to the default Color
        nextButton.style.backgroundColor = "rgb(195, 199, 199)";

        // Get a new random prompt
        costChosen = getRandomIndex();
        // Update the displayed prompt
        updateUI();
    }
















    
    // When Users Check their answers
    checkButton.addEventListener("click", function () {
        const selectedRadioButton = document.querySelector('input[name="classA"]:checked') as HTMLInputElement;

        if (selectedRadioButton) {
            const selectedValueA = selectedRadioButton.value;
            const nextButton = document.getElementById("nextBtn") as HTMLButtonElement;
            nextButton.disabled = true;
            if (selectedValueA === costs[costChosen].answers[0]) {
                // If answers are correct
                nextButton.style.backgroundColor = "rgb(145, 202, 204)";
                nextButton.disabled = false;  // Enable the "Next" button
                nextButton.textContent = "Next"  // Disable the "Next" button
                nextButton.addEventListener("click", () => {
                    resetUI();
                });
            } else {
                // If answers are not correct
                nextButton.style.backgroundColor = "#cc9391";
                nextButton.textContent = "Try Again"; // Disable the "Next" button
                nextButton.disabled = true;   // Disable the "Next" button
                nextButton.style.color = "black";
            }}
        else {
            alert('Please select an answer.');
        }
    });

    // Initial setup when the page loads
    updateUI();
</script>

<style>
    .modal{
        padding:20px;
        width:100%;
        height:100%;
        background-color: rgb(240, 240, 240);
    }
    .container{
        font-family: var(--primaryFont);
        font-size: var(--text-md);
    }
    .selected{
        font-size: var(--text-lg);
    }


    .container{
        border: var(--border);
        width:100%;
        height:min-content;
        display: flex;
        flex-direction: column;
        gap:1em;
        padding:20px;

    }
    .a {
        background-color: rgb(240, 240, 240);
        padding:20px;
        width:100%;
        height:20%;
        display: flex;
        flex-direction: column;
        gap:1em;
        justify-content: center;
        align-items: center;
    }
    .b{
        display: flex;
        height:50%;
        width:100%;
        justify-content: center;
        align-items: center;
        background-color: rgb(240, 240, 240);
        padding:20px;
    }

    .left, .right {
        width:50%;
        display: flex;
        height:100%;
        flex-direction: column;
        padding:10px;
        gap:1em;
        justify-content: center;
        align-items: center;

    }

    .controls{
        height:50px;
        width:33%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(240, 240, 240);
        font-size:var(--text-md);
        border:none;
        color:black;
        padding:20px;

    }
    .controls:hover{
        background-color: rgb(189, 189, 189);
    }
    .c{
        display: flex;
        height:min-height;
        width:100%;
        justify-content: center;
        align-items: center; 
        gap:0.2em;
    }
  

    .options{
        display: flex;
        justify-content: start;
        align-items: center;
        gap:1em;
        width:250px;
        font-size: 25px;
    }

    .options input[type='radio'] {
        width:20px;
        height:20px;
        accent-color: rgb(145, 202, 204);
        
    }

    .options input[type='radio']:checked {
        appearance: none;
        -webkit-appearance: none;
        border-radius: 50%;
        background: rgb(145, 202, 204);
        border: 3px solid #5b9390;
    
    }

   
    #restart{
        display: none;
        width:100%;
    }
    #solution{
        display: none;
    }
    #nextBtn{
        background-color: rgb(195, 199, 199);

    }
</style>


















































































    */




    
    const MyApp = {}; // Globally scoped object

    function foo(){
        MyApp.color = 'green';
    }

    function bar(){
        alert(MyApp.color); // Alerts 'green'
    } 

    const checkButton = document.getElementById("checkButton");
    const nextButton = document.getElementById("nextButton");
    checkButton.addEventListener("click", bar);
    nextButton.addEventListener("click", foo );






    /*
    let randomPrompt;

    
    function updateGlobalVariable() {
        randomPrompt = "New Prompt";
        console.log("Global Variable Updated: " + randomPrompt);
    }

    function accessGlobalVariable() {
        console.log("Accessed Global Variable: " + randomPrompt);
    }

    checkButton.addEventListener("click", accessGlobalVariable);
    nextButton.addEventListener("click", updateGlobalVariable );
*/