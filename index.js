const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/", (req, res) => {
    res.send("Hello");    
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`nodejs server listening in port ${port}`);
