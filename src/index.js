import express  from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import authRouter from './routes/authRouter.js'
import fluxRouter from './routes/fluxRouter.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express())
app.use(express.json())


app.use(authRouter)
app.use(fluxRouter)

const PORT= process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(chalk.bold.green(`Server Online, port: ${PORT} `))
})
