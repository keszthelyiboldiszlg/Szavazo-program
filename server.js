const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.databaseURL);

const app = express();

app.use(express.static('public'));

/*app.get('/', function(request, response) {
    response.end('wauwau');
}); */

const schema = new mongoose.Schema({
    nev: String,
    szavazatok: Number    
}); 

const model= mongoose.model('Opciok',schema,'Opciok');

app.use(express.urlencoded());
app.post('/szavazas', function(request, response) {
	console.log(request.body);

    model.findOne({nev: request.body.gomb}, function(err,doc){
        if(doc) {
            console.log(request.body.gomb + " ez már létezik");
            doc.szavazatok++;
            doc.save();
        }
        else{
            console.log(request.body.gomb + " még nem létezik")
            new model({
                nev : request.body.gomb,
                szavazatok: 1
            }).save();
        }
    })
    response.redirect("/");
})

app.listen(9000);