import axios from 'axios'
import { Spinner } from 'clui'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { categories } from './categories'

const baseURL = 'https://opentdb.com/api.php?amount=10'

//Get Categories
export async function getCategories(){
    for(const category in categories){
        console.log(category)
    }
}

//Get random questions 
export function randomQuestions(args){
    let type = args.type || args.t;
    let amount = args.amount || args.a

    fetchingQuesAns({ type, amount })
}
//Get by category
export function byCategory(args){
    let amount = args.amount || args.a
    let categoryName = args.category || args.c
    let categoryNumber = 0
    if(categoryName in categories){
        categoryNumber = categories[categoryName]
    }else{
        console.log(`Invalid category. Please run ${chalk.red('quiz get-categories')} to get valid category names`)
        return
    }

    fetchingQuesAns({ amount, category : categoryNumber })
} 


async function fetchingQuesAns(params){
    const status = new Spinner("Fetching some questions....")
    status.start()

    try {
        const questions = []
        const correctAnsStore = {}
        const questionsInqProps = {
            type:'list',
            validate: function( value ) {
                if (value.length) {
                    return true;
                } else {
                        return 'Please choose any option';
                }
            },
        }
        const response = await axios.get(baseURL,{ params})

        response.data.results.map((item) => {
            let choices = []
            correctAnsStore[item.correct_answer] = item.correct_answer
            choices.push(item.correct_answer)
            choices.push(...item.incorrect_answers)
            questions.push({...questionsInqProps, message: `${chalk.green(item.question)}` , name: item.correct_answer, choices })
        })

        status.stop()
        const userAnswers = await inquirer.prompt(questions)
        rightAnswersResults(correctAnsStore , userAnswers )
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status)
    }finally{
        status.stop()
    }
}

function rightAnswersResults(correctAns, userAns){
    let results = 0

    for(let ans in correctAns){
        if(ans in userAns){
            if(userAns[ans] === ans){
                results++
            }
        }
    }
    console.log(chalk.yellow.italic("Oops game over your score is: ") + chalk.cyan(results * 1000) )
}