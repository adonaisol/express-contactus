var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();


var jparser = bodyParser.json();
var parser = bodyParser.urlencoded({ extended: false });

router.get('/', function (req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

router.post('/', parser, function (req, res, next) {
  req.assert("name", "The name is absolutely required").notEmpty();
  req.assert("message", "You cannot leave the message body empty").notEmpty();
  console.log(req.body);
  var errs = req.validationErrors();
  if (errs) res.render('contactus', { errors: errs });
  else {
    var userDetails = req.body;
    //res.render('contactus', { title: 'Contact Us' + req.body.name });
    userDetails.ip = req.ip;
    console.log(userDetails);
    fs.writeFile("contact-info.txt", JSON.stringify(userDetails), function (err, data) {
      if (err) console.log("Error: " + err);
    });
    res.redirect(307, 'thankyou' + req.path);
  }
  
});

module.exports = router;