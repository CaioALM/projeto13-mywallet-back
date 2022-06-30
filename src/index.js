import express  from "express"
import joi from 'joi'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import chalk from 'chalk'
import { userSignIn, userSignUp } from '../src/controllers/userControllers.js'


dotenv.config()
const PORT= process.env.PORT

const app = express()
app.use(cors())
app.use(express())
app.use(express.json())

app.post('/sign-up', userSignUp)
app.post('/sign-in', userSignIn)


app.listen(PORT, ()=> {
    console.log(chalk.bold.green(`Server Online, port: ${PORT} `))
})
