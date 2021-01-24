const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const VehiculeRouter = require("./routes/vehicule");
const Concessionaire = require("./routes/concessionaire");
const Owner = require("./routes/owner");

app.use(bodyparser.json());

app.use(VehiculeRouter);
app.use(Concessionaire);
app.use(Owner);

app.listen(3000);
