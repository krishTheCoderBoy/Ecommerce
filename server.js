import  express  from "express";
import  Color  from "colors";
import {config} from "dotenv";
import {connectDB}  from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRout.js";
import categoryRoutes from "./routes/catagoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"; 
import cors from 'cors'
//config env
config();
//database config
connectDB();
 
//rest object
const app=express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)


//rest api
app.get('/',(req,res)=>{
    res.send({
        message:"welcome to ecomerce app"
    })
    
})
//port
const PORT=process.config.PORT||8080;
//run listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan.white)
})