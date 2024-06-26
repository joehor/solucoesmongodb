const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const routes = require('./app/routes');

const app = express();

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Bem vindo à API solucoes MongoDB do Grupo K1." });
});

// rotas do servidor
// app.use('/api', routes);
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 30260;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});