import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import cors from 'cors';
import helmet from "helmet"
import morgan from 'morgan';
import clientRoutes from './routes/client'
import generalRoutes from './routes/general'
import salesRoutes from './routes/sales'
import managementRoutes from "./routes/management"

//data import 
// import User from "./models/User"
// import Product from "./models/Product"
// import ProductStat from "./models/ProductStat"
// import Transaction from './models/Transaction'
// import OverallStat from './models/OverallStat'
// import AffiliateStat from "./models/AffiliateStat";
// import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat} from "./data/index.js"
// import { dataAffiliateStat } from "./data";

// import { MONGO_URL } from "./dbURL";
const MONGO_URL = "mongodb+srv://popstar:pop1234@cluster0.zfjffpr.mongodb.net/?retryWrites=true&w=majority"

const app = express()

/*middlewares*/
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/*routes*/
app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes)
app.use("/sales", salesRoutes)

/*mongoose setup */
const PORT = 5001

mongoose.set('strictQuery', false)
mongoose
    .connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

        /*only add data one time */
        //User.insertMany(dataUser)
        //Product.insertMany(dataProduct)
        //ProductStat.insertMany(dataProductStat)
        //Transaction.insertMany(dataTransaction)
        //OverallStat.insertMany(dataOverallStat)
        // AffiliateStat.insertMany(dataAffiliateStat)

    })
    .catch((error) => console.log(`${error} did not connect`))
