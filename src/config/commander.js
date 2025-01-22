import { program } from "commander"

program
    .option('--mode <mode>', '', 'dev')
program.parse()

export default program.opts()