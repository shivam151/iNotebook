const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
connectToMongo();

const app = express();
const port = 5000;

//this is use of the middle where
app.use(express.json());



app.use(cors())

// available rotes
app.use("/api/auth/", require("./routes/auth.js"));
app.use("/api/notes/", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`iNotebook backend is listening on port ${port}`);
});
