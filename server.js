const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes.js')(app);

app.use(express.static(path.join(__dirname, 'client/build')));





//Return react app in production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html')); 
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});