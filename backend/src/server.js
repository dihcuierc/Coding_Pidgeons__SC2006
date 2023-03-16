import express from "express";
import cors from "cors";

import authRoutes from "./routes/authentication";
import {collectData} from "./DBConnection";
import {errorHandler} from "./errors/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users",authRoutes);
app.use(errorHandler);

app.listen(8080, () => {
    console.log(`Server running on localhost:8080`);
    collectData();
})