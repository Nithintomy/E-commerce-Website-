import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import authRoutes from './routes/authRoutes'
import cartRoutes from './routes/cartRoutes'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorMiddleware'


dotenv.config() 

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors());
app.use(errorHandler);


//connect DB
connectDB();

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes) 
app.use('/api/cart',cartRoutes)

   

app.listen(PORT,()=>{  
    console.log(`Server is Running on http://localhost:${PORT}`)
})