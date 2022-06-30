import express  from "express"
import joi from 'joi'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import chalk from 'chalk'


dotenv.config()
const PORT= process.env.PORT

const app = express()
app.use(cors())
app.use(express())
app.use(express.json())


app.post('/users', (req, res) => {


})

app.get('/users', (req, res) => {

})
app.listen(PORT, ()=> {
    console.log(chalk.bold.green(`Server Online, port: ${PORT} `))
})
