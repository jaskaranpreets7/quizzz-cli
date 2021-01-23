import axios from 'axios'
import CLI, { Spinner } from 'clui'

const progress = CLI.Progress

const baseURL = 'https://opentdb.com/api.php?amount=100'

//Get random questions 

export async function randomQuestions(args){
    let type = args.type || args.t;
    const status = new Spinner("Fetching some questions....")

    status.start()

    try {
        const response = await axios.get(baseURL,{
            params:{
                type
            }
        })
        status.stop()
        console.log(response.data)
    } catch (error) {
        status.stop()
        console.log("Request got failed with status code: " + error.response.status)
    }finally{
        status.stop()
    }
}