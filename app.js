import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import brandRoutes from './routes/brandRoutes.js';
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import db from "./config/db.js";
// Routes
import blogRoutes from "./routes/blogRoutes.js";
import carVideoRoutes from './routes/carVideoRoutes.js';
import carTypeRoutes from './routes/carTypeRoutes.js';
import carRoutes from "./routes/carRoutes.js"
import carSpecificationRoutes from './routes/carSpecificationRoutes.js';
const app = express();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// Global input sanitization middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Developing logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
	res.send("Car rental API is Running...");
	next();
});

app.use("/api/cars" , carRoutes);
app.use('/api/brands', brandRoutes);
app.use("/api/cartypes",carTypeRoutes)
app.use('/api/carVideos', carVideoRoutes);
app.use('/api/carSpecifications', carSpecificationRoutes);
// API ROUTES
app.use("/api/blogs", blogRoutes);
// app.post("/blog", async (req, res) => {
// 	const { title, content, author } = req.body;
// 	try {
// 		const blog = await db("blog").insert({ title, content, author });
// 		res.status(201).send(blog);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// app.get("/blog", async (req, res) => {
// 	try {
// 		const blogs = await db.select("*").from("blog");
// 		res.status(201).send(blogs);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find this ${req.originalUrl} on this server.`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;