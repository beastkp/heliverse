const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./db/connect");
const userRouter = require("./routes/user.route");
const filterRouter = require("./routes/filters.route");
const teamRouter = require("./routes/team.route");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/query/users",filterRouter);
app.use('/api/team',teamRouter)


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}   

start();






