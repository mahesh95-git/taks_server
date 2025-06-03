import e from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/project.js";
import taksRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
config();
const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taksRouter);
app.use("/api/v1/project", projectRouter);
app.use(cookieParser());
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error in middleware:", err);
    res.status(500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
});


const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));