// set questions

const questions = [
    {
        question : "What is the capital of France?",
        answers :[  
                    { text: "London", correct: false},
                    { text: "Berlin", correct: false},
                    { text: "Madrid", correct: false},
                    { text: "Paris", correct: true},
        ]
    },
    {
        question : "What is the smallest continent in the world?",
        answers :[  
                    { text: "Asia", correct: false},
                    { text: "Australia", correct: true},
                    { text: "Africa", correct: false},
                    { text: "Arctic", correct: false},
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answers :[
                    { text: "Monaco", correct: false},
                    { text: "Vatican City", correct: true},
                    { text: "Maldives", correct: false},
                    { text: "San Marino", correct: false},
        ]
    }
    
];

const questionElement = document.getElementById('question');
const answerBtns = document.getElementById('answerBtn');
const nextButton = document.getElementById('nextBtn');

//store the question and score
let currentQuestionIndex = 0;
let score = 0;

function start(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showNext();
}

function showNext(){

    // to clear the previous answers
    resetState();

    let cQuestion = questions[currentQuestionIndex];
    let qNo = currentQuestionIndex + 1;
    questionElement.innerHTML = qNo + ". " + cQuestion.question;
    
    // to get answers
    cQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;

        button.classList.add("btn");
        answerBtns.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        // click event for each answer
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const iscorrect = selectedButton.dataset.correct == "true";
    if(iscorrect){
        selectedButton.classList.add("correct");
        // score
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button =>{
        if(button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display = "block";
}


function handleNextBtn(){
    if(currentQuestionIndex < questions.length){
        showNext();
    }else{
        resetState();
        questionElement.innerHTML = "Your score is " + score + " out of " + questions.length;
        nextButton.innerHTML = "Restart";
        nextButton.style.display = "block";
    }
}


nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        currentQuestionIndex++;
        handleNextBtn();
    }else{
        start();
    }
});

start();