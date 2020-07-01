//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/voila'));

// app.get('/', function(req,res) {
// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'src/index.html'));
// });
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/voila/'});
    // res.send('./dist/voila/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4300);