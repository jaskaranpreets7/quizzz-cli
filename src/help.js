import chalk from 'chalk'

const menus = {
    main: `
        ${chalk.white.bold('quiz [command] <options>')}
        ${chalk.blueBright('version')} ............ show package version
        ${chalk.blueBright('help')} ............... show help menu for a command
        ${chalk.blueBright('random-questions')} ............... get all random questions
        ${chalk.blueBright('get-categories')} ............... get all availabe categories
        ${chalk.blueBright('by-category')} ............... get question by particular category
    `,

    'random-questions':`
        ${chalk.greenBright('quiz random-questions <options>')}
        --type, -t ..... get questions with type multiple or boolean (true/false)
        --amount, -a ..... get amount of questions you wanted to answer 
    `,

    'get-categories':`
        ${chalk.greenBright('quiz get-categories')}
    `,

    'by-category':`
        ${chalk.greenBright('quiz by-category <options>')}
        --category, -c ..... get questions with particular category
        --amount, -a ..... get amount of questions you wanted to answer 
    `
}

export function help(args) {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0]
    console.log(menus[subCmd] || menus.main)
}