import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import apiRateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRateLimiter);
app.use("/api/v1/books", bookRoutes);

app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}`);
});
