require("dotenv-safe").config({ silent: true });
const express = require("express"); //import express
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); //initialize the server
app.use(express.json()); //parse to json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//router routes
const usersRoute = require("./routes/users");
const supplierRoute = require("./routes/suppliers");
//API routes
app.use("/api/users", usersRoute); //we put the route in /api/users
app.use("/api/suppliers", supplierRoute);
app.use("/api/products", require("./routes/products"));
app.use("/api/supply", require("./routes/supply"));
app.use("/api/order_details", require("./routes/orderDetails"));
app.use("/api/orders", require("./routes/orders"));

//port to run app
const port = "5000";
app.listen(process.env.PORT || port, () => {
  console.log(`server is up and runing on port: ${process.env.PORT || port}`);
});
