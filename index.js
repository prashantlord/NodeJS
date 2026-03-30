import express from "express";
import connectMongoDb from './connections.js';
import logMiddleware from "./middleware/log-middleware.js";
import {userRouter} from "./routes/userRouter.js";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT;

connectMongoDb(process.env.DB_HOST).then((res) => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

app.use(express.urlencoded({extended: true}));
app.use(logMiddleware);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
