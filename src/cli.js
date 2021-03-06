import minimist from 'minimist' 
import chalk from 'chalk'
import figlet from 'figlet'

import { version } from './version';
import { help } from './help'
import { randomQuestions, byCategory, getCategories } from './utils'

export async function cli(argsArray){
    const args = minimist(argsArray.slice(2));
    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version';
    }

    if (args.help || args.h) {
        cmd = 'help';
    }

    console.log(
        chalk.redBright.bgBlackBright(
            figlet.textSync('QUIZZ CLI',{ horizontalLayout: 'full'})
        )
    )

    switch(cmd){
        case "version":
            version()
            break
        
        case "help":
            help(args)
            break
        case "random-questions":
            if(args.type || args['type'] || args.t || args.amount || args['amount'] || args.a ){
                randomQuestions(args)
            }else{
                help(args)
            }
            break
        case "get-categories":
                getCategories()
            break
        case "by-category":
            if(args.amount || args['amount'] || args.a || args.category || args['category'] || args.c ){
                byCategory(args)
            }else{
                help(args)
            }
            break
        default:
            console.error(`${cmd} is not a valid command!`);
            break;
    }
}