var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact')
});

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport( {
    service: 'Gmail',
		auth: {
			user: 'your@email.com',
			pass: 'password'
		}
  });

  var mailOptions = {
    from: 'Le Hung <lecaoquochung@gmail.com>',
    to: 'admin@lecaoquochung.com',
    subject: 'Simple Nodejs Contact',
    text: 'You have a submission. Name: ' +req.body.name+ 'Email: '+req.body.email+ 'Message: '+req.body.message,
    html: '<p>You have a submission.</p><ul><li>Name: ' +req.body.name+ '</li><li>Email: '+req.body.email+ '</li><li>Message: '+req.body.message +'</li></ul>'
  };
})

app.listen(3000);
console.log('Server is running on port: http://localhost:3000');
