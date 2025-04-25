import express from "express";

const app = express();

app.get("/", (_request, response) => {
  response.status(200).send({ message: "Status ok" });
});

// user test:
// username: test
// password: uniat
app.post("/login", (request, response) => {
  const { username, password }: { username: string; password: string } =
    request.body;

  if (!username || !password) {
    response.status(400).send({ message: "Missing username or password" });
    return;
  }

  const key: string = username + password;

  response.status(200).send({ message: `Hello ${username}`, key });
});

export default app;
