import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for all origins
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

app.get("/", (_request, response) => {
  response.status(200).send({ message: "Status ok" });
});

// user test:
// email: test
// password: uniat
app.post("/login", (request, response) => {
  const { email, password }: { email: string; password: string } = request.body;

  if (!email || !password) {
    response.status(400).send({ message: "Missing email or password" });
    return;
  }

  const key: string = email + password;

  response.status(200).send({ message: `Hello ${email}`, key });
});

export default app;
