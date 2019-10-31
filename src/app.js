/**
 * const express => is a function that helps to create EXPRESS application
 */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const PORT = process.env.PORT | 3000;


/**
 *
 * console.log(__dirname);
 * console.log(__filename);
 * path.join() => returns the complete path after manipulating string
 * console.log(path.join(__dirname, '../public'));
 *
 * app.use() => for now it means to just customize the server
 *
 * express.static() => its a function which will return a value to "app.use"
 * after configure the path of static assets(css, js, html, images)
 *
 * express.set() => app.set allows to set a value to expressing setting
 *
 * res.render() => helps to render view
 *
 * app.set('view engine', 'hbs'); => set "handler bar" view engine in express to render dynamic template
 *
 * app.set('views', viewsPath) => set the new directory path for views  to render
 *
 */

//Define path for Express Config
const publicDirectoryPath =  path.join(__dirname, '../public');
const viewsPath =  path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handle Bars Engine, Views Location and Register Partials Directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

//Setup static directory serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {

    //by default it will go to views(if we do not set different directory manually) in source directory and search for the file name 'index'
    res.render('index', {
        title: 'Weather App',
        name: 'Khaled Hasan'
    });

});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'Khaled Hasan',
        imgSrc: '/assets/images/weather.gif'
    })

});

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        name: 'Khaled Hasan',
        message: 'How may I help you?'
    })

});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        });
    }

    let address = req.query.address;

    //Here we have used Object Destructing to destructure GeoData = { latitude, longitude, location }
    geocode.geocode(address, ( error, { latitude, longitude, location } = {} ) => {
        if(error){
            // console.log(`Error: ${error}`);
            res.send({ error });
        }
        else {
            // Object Destructure is used;
            forecast.forecast( latitude, longitude, ( error, { temperature, precipProbability } = {} ) => {
                if(error){
                    // console.log(`Error: ${error}`);
                    res.send({ error });
                }
                else {
                    const newData = {
                        temperature,
                        precipProbability,
                        location
                    }
                    // console.log(newData);
                    res.send(
                        {
                            temperature: newData.temperature,
                            precipProbability: newData.precipProbability,
                            location: newData.location,
                            address: req.query.address
                        });
                }
            });
        }

    });



});

/**
 * [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
 *
 * This error indicates we are sending multiple response when only one is allowed
 *
 */
app.get('/products', (req, res) => {

    if (!req.query.search) {

        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);

    res.send({
        products: []
    });
});


//This route needs to be the last one because it holds wild card which means everything is a match.
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404! Help Article',
        message: 'Help Article Not Found.',
        name: 'Khaled Hasan'
    });

});

//This route needs to be the last one because it holds wild card which means everything is a match.
app.get('*', (req, res) => {

    res.render('404', {
        title: '404!',
        message: 'Sorry, Page Not Found.',
        name: 'Khaled Hasan'
    });

});

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
