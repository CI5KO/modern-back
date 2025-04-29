import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = ["http://localhost:3051", "http://localhost:8080"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_request, response) => {
  response.status(200).send({ message: "Status ok" });
});

app.post("/login", (request, response) => {
  const {
    email,
    password,
  }: { email: string | undefined; password: string | undefined } = request.body;

  if (!email || !password) {
    response.status(400).send({ message: "Missing email or password" });
    return;
  }

  const key: string = `${email}:${password}`;

  response.status(200).send({ message: `Hello ${email}`, key });
});

app.get("/hello", (request, response) => {
  const token = request.cookies?.token;
  if (!token) {
    response.status(401).json({ message: "No token found in cookies" });
    return;
  }

  const [email] = token.split(":");
  if (!email) {
    response.status(400).json({ message: "Invalid token format" });
    return;
  }

  response.status(200).json({ message: `Hello! ${email}` });
});

export default app;
