const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('current_year', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('scream_it', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${req.method} ${req.url}`;

    console.log(now + '\n' + log);
    fs.appendFileSync('data_base.log', now + '\t' + log + '\n', (e) => {
        if (e) {
            console.log('unable to append sync');   
        }
    });
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenents.hbs');
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        page_title: 'Home Page',
        welcome_message: 'welcome to my home page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page_title: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'there is an error'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});
