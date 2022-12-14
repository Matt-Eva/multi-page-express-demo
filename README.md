# Simple Static Multi-Page Express App

This repo demonstrates a simple way to build a small, multi-page static site using express, HTML, CSS, and vanilla JavaScript. It does not represent a definitive way in which to structure a multi-page express web app. 

## Installation:

To start building your simple static app, begin by creating a project directory in which you want your app to live by running the `mkdir` command on your command line . Ex: `mkdir my-new-static-website`.

Then, `cd` into this directory: `cd my-new-static-website`.

Once inside this directory, run the `npm init` command. You'll be prompted by a series of options. You can accept all the default options by pressing enter.

Running `npm init` in your directory enables you to start installing `npm` packages that you can then use in your project. Express is an `npm` package.

To install Express, run `npm install express` within your directory.

Check your `package.json` file to see if express has been successfully installed. You should see it listed as a dependency:
```
{
  "name": "express-multi-page-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2" <--- Listed as a dependency here.
  }
}
```

## Creating files:

### index.js

Now that you've installed everything, it's time to start creating some files! We'll start by creating our `index.js` file - `touch index.js` - in the root folder of our project. This file will serve as the entry point to your application.

Within this file, we'll need to gain access to a few resources provided by express. Add this code to the top of your file:

```
const express = require('express')
const app = express()
const port = 4000
```

Now we're ready to use some of express's features!

The first thing we're going to do is write the following code in our index.js file.

```
app.listen(port, () =>{
    console.log(`app open on port ${port}`)
})
```

This tells express to open our app on the port that we specified earlier in our code. By adding the `console.log`, we'll get a confirmation in our terminal when we start our application.

We can actually start our server now! Within your root folder, run the command `node index.js` on your command line. You should see the following message output to your terminal:

```
app open on port 4000
```

We can close our server down by running `control C` in our terminal.

### The Public Folder

Now that we've set up our entry point for our app, we need to create the files we want to serve to our users. Let's first start by creating a `public` folder where we can store all those files (this is where we'll be putting our html, javascript, and css). Run the `mkdir public` command in your root directory. Then `cd` into the public folder - `cd public`.

Inside the public directory, we're going to be creating a few more folders - each folder will contain all of the files necessary for rendering a single webpage. Let's start by creating a folder to render our homepage.

#### Home

Inside the `public` folder, make a new directory called `home` by running `mkdir home` in your terminal. In here, we're going to creating 3 new files - `home.html`, `home.js`, and `home.css`. You can use the `touch` command to create these files - ex: `touch home.html`.

Let's give our `home.html` file some basic starting html:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script defer type="text/javascript" src="home.js"></script>
    <link rel="stylesheet" href="home.css"/>
</head>
<body>
    <h1>Home</h1>
    <a href="/about/about.html">About</a>
    <a href="/dev/dev.html">Dev</a>
</body>
</html>
```

Note that we've linked our `home.js` and our `home.css` files in the head section of our html using a script tag and a link tag.

Let's give those some starting code as well!

home.js
```
console.log("running home!")
```

home.css
```
h1 {
  color: blue;
}
```

#### Dev and About pages

Let's imagine our site needs two other pages - an about page, and a page for developers. Let's go through a similar process as we did for creating the homepage. We'll create two new directories within our `public` folder, then add code files to each directory that we'll use to render that webpage:

Dev:
dev.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script defer type="text/javascript" src="dev.js"></script>
    <link rel="stylesheet" href="dev.css"/>
</head>
<body>
    <h1>Dev</h1>
    <a href="/about/about.html">About</a>
    <a href="/home/home.html">Home</a>
</body>
</html>
```
dev.js
```
console.log("running dev!")
```
dev.css
```
h1{
  color: green
}
```

About:
about.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script defer type="text/javascript" src="about.js"></script>
    <link rel="stylesheet" href="about.css"/>
</head>
<body>
    <h1>About</h1>
    <a href="/home/home.html">Home</a>
    <a href="/dev/dev.html">Dev</a>
</body>
</html>
```
about.js
```
console.log("running about!")
```
about.css
```
h1{
  color: red
}
```

### Serving Files

Now that we have our files set up, it's time to tell express to serve them to our users! Let's head back over to our `index.js` file.

In this file, we're going to add another line of code:

```
app.use(express.static(`public`))
```

This line of code is telling express to serve all of the files we stored in our public folder as static assets. Now, when somebody makes a request for one of these files - like our `html` files - our app can send it to the user's browser, along with the javascript and css files that `html` file is using.

If you start your server - `node index.js` - and visit `http://localhost:4000/home/home.html` you should see your homepage being rendered in the browser! You should also be able to navigate to your two other pages using the links you added to your html.

If you check out the `sources` tab in your devtools, you can see which files are being served for each webpage that you're rendering. Awesome! We're almost done!

### Handling 404 requests

Let's set up a way to handle bad requests to our website - let's say somebody enters in an invalid url to our site. Instead of showing them a 404 page, let's redirect them to the homepage of our website.

We can do this by adding some more code to our index.js file:

```
app.use((req, res, next) =>{
    if (res.status(404)){
        res.redirect('/home/home.html')
    }
})
```

This will check to see if the status response from our server is a 404 response (404 is the status code for "not found"). If we are getting a 404 status for a user request, we'll redirect that user to the `/home/home.html` endpoint instead, which will serve that homepage to our user.

After you added this code, make sure to shut down and restart your server. Then test this out in your browser by entering an invalid url following the base url. You should be redirected to the homepage!

## Conclusion

That's it! A super basic, straightforward way to set up a static, multi-page express app. If you want to start making api and database calls, you can either add that logic to this server, or set up a different server that handles api requests and direct those requests to that api from your frontend.
