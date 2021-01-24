import axios from 'axios'
import { Spinner } from 'clui'
import inquirer from 'inquirer'
import chalk from 'chalk'

const baseURL = 'https://opentdb.com/api.php?amount=10'

//Get random questions 

export async function randomQuestions(args){
    let type = args.type || args.t;
    let amount = args.amount || args.a
    const status = new Spinner("Fetching some questions....")
    status.start()

    try {

        const response = await axios.get(baseURL,{
            params:{
                type,
                amount
            }
        })

        const questions = []

        const questionsProps = {
            type:'checkbox',
            validate: function( value ) {
                if (value.length) {
                    return true;
                } else {
                        return 'Please choose any option';
                }
            },
        }

        response.data.results.map((item) => {
            let choices = []
            choices.push(item.correct_answer)
            choices.push(...item.incorrect_answers)
            questions.push({...questionsProps, message: `${chalk.green(item.question)}` , name: item.correct_answer, choices })
        })

        status.stop()

        const answers = await inquirer.prompt(questions)
        console.log(answers)
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status)
    }finally{
        status.stop()
    }
}