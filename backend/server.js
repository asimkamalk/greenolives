import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import settingsRouter from "./routes/settingsRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4001;


// middlewares
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const allowList = [
      'http://localhost:5173',
      'https://admin.newgreenolives.com',
      'https://newgreenolives.com'
    ];
    if (!origin) return callback(null, true);
    try {
      const hostname = new URL(origin).hostname;
      const isVercel = /\.vercel\.app$/.test(hostname);
      if (allowList.includes(origin) || isVercel) {
        return callback(null, true);
      }
    } catch (e) {}
    return callback(null, false);
  },
  credentials: true
}))

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/settings", settingsRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))