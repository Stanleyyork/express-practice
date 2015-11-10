# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Express Practice

### Base Challenges - Build an Express App

**Check Install**

1. You should have Node.js and NPM installed from installfest. Run the Terminal commands `which node` and `which npm` to check that they are installed. If they are installed, you will see a file path after each command, like `/usr/local/bin/node`.

1. **Only if you do not have node and npm installed**:
  Install Node & NPM   
  * <a href="https://nodejs.org/download/" target="_blank">Standalone installer</a>   
  * <a href="http://blog.teamtreehouse.com/install-node-js-npm-mac" target="_blank">Homebrew</a>  
    1. To install Homebrew:

        ```bash
          ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        ```

    2. To install Node.js: `brew install node`


**Initialize a Node.js Project with Express**

1. Make a directory called `simple-express`. From inside your `simple-express` directory, enter the Terminal command `npm init`. It asks a series of questions about your project and uses the information to create a `package.json` file for you. For now, we'll use all of the defaults except "entry point". Type in `server.js` for your entry point, and then you can just hit enter until `npm init` is done.  

2. Add express to the local project using `npm`. Use the `save` option so that NPM automatically adds express to your dependencies in `package.json`.

  ```bash
  npm install express --save
  ```

**Express Hello World!**

1. Create a `server.js` file and add this basic hello world code:

  ```js
    // server.js
    // SERVER SIDE JAVASCRIPT
    var express = require('express');
    var app = express();

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    var server = app.listen(process.env.PORT || 3000, function () {
      console.log('Example app listening at http://localhost:3000/');
    });
  ```

1. Add a comment above each line of code saying what each line does.

  > **Hint**: Reference the documentation linked in the README.  
  > **Hint**: `process.env.PORT || 3000` means "in production use the production port, otherwise use 3000 (for development)".

1. Run `nodemon server.js` in the Terminal, and visit `http://localhost:3000/` in your browser. You should see "Hello World!"   

1. Console log the `req` (request) and the `res` (response) objects inside your server code's `app.get` method for the `/` path. (The `/` path is often called the "root" path.) Restart the server and briefly check out what the `req` and `res` are.


**Add Server-Side HTML Templating**

All of the files and data for a website usually live on its server(s) and are sent to clients when they request it.  So, even files like HTML and CSS that are only front end related have to get to our users through our server.

We could just send along a lot of static files -- and we'll look at how to do that with Express a little later. In that case, we'd make a separate jQuery AJAX request for any of our data we wanted to display.

For HTML, though, we're going to take advantage of something called server-side templating.  Server-side HTML templating basically lets us put data into an HTML file before the server sends it over to the client. The template is like a version of an HTML file with blanks, and we let a server-side "view engine" know how to fill them in with the server's data.


1. Install the templating system `hbs` for this project using the Terminal:

  ```bash
     npm install hbs --save
  ```

1. Create a new folder `views` with a file `index.hbs` inside. The `index.hbs` file will be our template, and hbs will translate it into HTML before sending it to clients. Our `index.hbs` can look exactly like an HMTL file.  For now, it should just say `<h1>General Assembly Rocks!</h1>` (or a custom message of your choice).

1. Set the project's view engine to hbs. This lets express know what module should render the template (i.e., fill in the blanks).

  ```js
    // server.js
    // ...
    app.set('view engine', 'hbs');
  ```

1. Change the `app.get` route to render the template file instead of just sending back a string.

  > **Hint**: The method you'll need to use is <a href="http://expressjs.com/api.html#res.render" target="_blank">res.render</a>.

1. Visit `http://localhost:3000/` in your browser. You should see "General Assembly Rocks!"

  > **Hint**: Nodemon should automatically refresh with each saved change you make.  If not, remember to stop and restart your server from the Terminal to view any changes. Hit `control + c` to stop your server, and run `nodemon server.js` again to restart it.


1. If our `index.hbs` is just plain HTML, we're not taking advantage of templating.  Add the following header to your `index.hbs` jumbotron:

  ```html
  <h1>{{ name }} is awesome!</h1>
  ```

1. Refresh your page. What do you see?

1. `hbs` uses `{{` ... `}}` to figure out what to interpret as a template. The areas where a template has blanks that need to be filled in with some data are inside `{{` and `}}`.  So, `{{ name }}` makes `hbs` think there should be some `name` data available for it to use to fill in this blank.  Let's get some name data set up. In your server.js file, define a `myName` variable and assign your name to it as a string.

1. The `myName` variable is holding on to your name data on the server.  Now, we need to let `hbs` know to use that variable to fill in the `name` blank. To have this data show up on the page, we'll need to pass it to the render method. Update the `app.get` method for the `/` path:

  ```js
    // server.js
    app.get('/', function (req, res) {
      res.render('index', { name: myName });
    });
  ```

  Note that `name` is what the template looks for to fill the blank, and `myName` is the name of the variable storing that data.

**Add Some Data on the Server**

Now that we see how `hbs` uses simple data to fill in blanks, let's do something a little more complex -- `hbs` using JavaScript logic to loop over a list of data.

1. Add some starter data  (often called "seed data") to serve when the users view '/albums'.


  ```js
    // server.js
    var albums = [
      { title: 'Cupid Deluxe',
        artist: 'Blood Orange'
      },
      { title: 'M3LL155X - EP',
        artist: 'FKA twigs'
      },
      { title: 'Fake History',
        artist: 'letlive.'
    }]
  ```

1.  To have this data show up on the page, we'll need to pass it to the render method. Update the `app.get` method for `/albums` again so it can also render the `albums` data with the `hbs` template.

  > **Hint**: Add a key-value pair to the object we're already passing to the `render` method.

1. We also need to put a blank in our html template where the data will be filled in.

  ```html
  <!-- albums.hbs -->
  <h1>Your Albums</h1>

  {{#list albums}}
    <h3>{{title}} : </h3>
  {{/list}}
  ```

  ```js
  // server.js
  hbs.registerHelper('list', function(context, options) {
  var ret = "<ul>";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  }

    return ret + "</ul>";
  });
  ```

3. Restart your server and refresh the page. You should see a list of album titles.

4. Modify the basic template above so that the artist name is also shown with the title of each album.  


**Add Static Files (CSS, JS, Images)**

1. Make a directory in your project called `public` and add to it `styles.css`, `scripts.js`, and a directory called `images`. These files are called static files.

1. Set up the express app to serve the static files (actually, the whole public directory.)

  ```js
    // server.js
    app.use(express.static('public'));
  ```

1. Add your scripts and styles files to the `<head>` of your index.hbs

1. Get a 'console.log("I live to serve.")' from your `scripts.js` to appear in your browser dev tools console.

1. Get a custom style to work on your index.hbs page.

**Send Just JSON Data (with No Template)**

So far, we've been using server-side HTML templating with hbs to put the album data directly into our HTML before we send it.  Now, we'll add an API route that sends back raw JSON data instead of a filled-in HTML page.

We're making a weird app. Albums and taquerias.  Treat your senses.  

1. Add some taqueria seed data to your server file.

  ```js
    // server.js
    var taquerias = [
      { name: "La Taqueria" },
      { name: "El Farolito" },
      { name: "Taqueria Cancun" }
    ]
  ```

1. Add a route to your server side javascript that clients can use to get taqueria data.  The route's path should be `/api/taquerias`.  Instead of `res.send` (for simple strings) or `res.render` (for HTML templates), this route will use `res.json`.


  ```js
    app.get('/api/taquerias', function (req, res) {
      res.json(taquerias);
    });
  ```

1. Navigate to http://localhost:3000/api/taquerias (remember to restart your server first!) and check that the data is showing up.


### Stretch Challenges

1. In your `scripts.js` file, write a jQuery ajax request to get the taqueria data. When the response comes back, display all the taqueria names above the albums on your site's root page (localhost:3000/).  

  > **Hint**: `$.get('/api/taquerias', function(data){// your code here});`


2. Add a `vendor` folder to your project. The `vendor` folder is traditionally used for third-party (external) library code.  Download Bootstrap's CSS and JavaScript files and add them to the `vendor` folder. Can you include Bootstrap in your project from this location instead of the CDN? What is the benefit of having a separate `vendor` folder for external front-end libraries?

  > **Hint**: Remember to serve the static vendor files to make them available to your front end.

  ```js
    // server.js
    app.use(express.static('vendor'));
  ```

3. Add an image to your `public/images` folder and display it in `index.hbs`. Note: this is where Ganesh is coming from in the solutions.