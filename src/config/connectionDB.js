import { config } from "./config.js"
import mongoose from "mongoose"

export default class ConnectioDB {
    static #instance

    constructor(){
        mongoose.connect(config.mongoUrl)
    }

    static getInstance(){
        if (this.#instance) {
            console.log('Already connected to DB')
            return this.#instance
        } else {
            this.#instance = new ConnectioDB()
            console.log('Connected to DB')
            return this.#instance
        }
    }
}