require("express-async-error");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRuns = require("./database/sqlite/migrations");

const app = express();
app.use(express.json());
app.use(routes);
migrationsRuns();

app.use((error, request, response, next) => {
  //Usado para fazer tratamentos de Erros
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running ${port} ,`);
});
