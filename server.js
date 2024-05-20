// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
//package  imports
import express from "express";
import "express-async-errors"
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//securty packges
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//file imports
import connectDatabase from "./config/db.js";
//routes imports
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middleware/errorMiddileware.js";
import jobRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//database connection
connectDatabase();

//Dot Env cofig
dotenv.config({path:'./config'})

// Swagger api config
// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8000",
           // url: "https://nodejs-job-portal-app.onrender.com"
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);



//rest objects
const app=express()

//middiwares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

// Routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
 
//validation middilware
app.use(errorMiddleware)

//port
const PORT = process.env.PORT || 8000;
const DEV_MODE = process.env.DEV_MODE || "development";

app.listen(PORT, () => {
  console.log(`Node Server Running In ${DEV_MODE} Mode on port no ${PORT}`.bgCyan.white
);
});
