import nodemailer from 'nodemailer'
import { config } from './config.js'


export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
            user: config.email_nodemailer,
            pass: config.pass_nodemailer
    }
})