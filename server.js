const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Não consegui conectar com server.log');     
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerPartials('getCurrentYear', () => {
    return new Date().getFullYear()
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle:'Página inicial',
        welcomeMessage:'Bem vindo'
    });    
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'Página sobre'
    })
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projetos'
    })
});

app.get('/bad', (req,res) => {
    res.send({
     errorMessage: 'Não deu pra mostrar'   
    });
});

app.listen(port, () => {
    console.log(`Sevidor na porta ${port}`);
    
});