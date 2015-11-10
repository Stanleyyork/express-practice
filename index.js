// SERVER SIDE JAVASCRIPT
var express = require('express');
var app = express();
var hbs = require('hbs');
app.set('view engine', 'hbs');
app.use(express.static('public'));

// DATA
// My Name
var myName = "Stanley";
// My Albums
var albums = [
	{ title: 'Cupid Deluxe',
	  artist: 'Blood Orange'
	},
	{ title: 'M3LL155X - EP',
	  artist: 'FKA twigs'
	},
	{ title: 'Fake History',
	  artist: 'letlive.'
	}];
// Taquerias
var taquerias = [
	{ name: "La Taqueria" },
	{ name: "El Farolito" },
	{ name: "Taqueria Cancun" }
];

// HELPER FUNCTIONS
// Defining list-helper function
hbs.registerHelper('list', function(context, options) {
	var ret = "<ul>";
	for(var i=0, j=context.length; i<j; i++) {
	  ret = ret + "<li>" + options.fn(context[i]) + "</li>";
	}
  	return ret + "</ul>";
});

// ROUTES
// Get: Root Index
app.get('/', function (req, res) {
  res.render('index', {name: myName});
});
// Get: Albums
app.get('/albums', function (req, res) {
	res.render('albums', {album: albums});
});
// Get: Tacuerias API
app.get('/api/taquerias', function (req, res) {
    res.json(taquerias);
});

// PORT
// In production use the production port, otherwise use 3000 (for development)
  var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening at http://localhost:3000/');
  });