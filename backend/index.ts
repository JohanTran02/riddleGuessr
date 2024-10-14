import express from "express"
import cors from "cors"
import { errorHandler } from "./resources/Error/errorHandler";
import riddleRoutes from "./resources/riddles/routes"

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.use("/api/riddles", riddleRoutes)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})