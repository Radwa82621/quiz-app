import { Quiz } from "./quiz.js"
export class Setting {
    constructor() {
        this.Category = document.getElementById("category");
        this.Difficulty = document.getElementsByName("difficulty");
        this.numberOfQuestions = document.getElementById("numberOfQuestions");
        document.getElementById("startBtn").addEventListener("click", this.startQuiz.bind(this))
    }
    async startQuiz() {
        let category = this.Category.value;
        let difficulty = Array.from(this.Difficulty).filter(el => el.checked)[0].value;
        let numberOfQuestions = this.numberOfQuestions.value
        let questions;
        if (numberOfQuestions == "") {
            $("#alert1").fadeIn(500);
        }
        else {
            var res = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
            var finalRes = await res.json();
            questions=finalRes.results;
            if (questions.length > 0) {
                $("#setting").fadeOut(500, () => {
                    $("#quiz").fadeIn(500)
                })

                let quiz = new Quiz(questions);
            }

        }
    }}

