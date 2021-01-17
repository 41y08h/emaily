const express = require("express");
const services = require("./services");

const app = express();
services(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
