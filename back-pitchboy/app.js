const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon api de test ^_^ </br> Liste des villes: /city/allCities </br> Information d\'une ville: /city/:code_postal </br> Supprimer une ville: /city/del/:code_postal')
})

app.get('/city/allCities', (req, res) => {
    fs.readFile('../resources/laposte_hexasmal.json', 'utf8', (err, data) => {
        if (err) {
          res.status(500).end(JSON.stringify({ message: err.message }));
          return;
        }
    
        res.status(200).end(data);
    });
})

app.get('/city/:code_postal', (req, res) => {
    const code_postal = req.params.code_postal;
    const data = JSON.parse(fs.readFileSync('../resources/laposte_hexasmal.json', 'utf8'));
    //console.log("data", data)
    const ville = data.filter((city) => {
        if (city.fields.code_postal === code_postal) {
            return city;
        }
    })
    console.log("ville", ville)
    if (ville[0]?.fields) {
        res.status(200).send(
            ville
        );
    } else {
        res.status(404).json({ error: "404", message: "Ville inconnue" })
    }
});
app.delete('/city/del/:code_postal', (req, res) => {
    const code_postal = req.params.code_postal;
    const data = JSON.parse(fs.readFileSync('../resources/laposte_hexasmal.json', 'utf8'));
    let cityIndex = -1;
    
    data.forEach((city, index) => {
        if (city.fields.code_postal === code_postal) {
          cityIndex = index;
        }
    });
    if (cityIndex === -1) {
        res.status(404).send("Ville non trouvée");
    } else {
        data.splice(cityIndex, 1);
        res.status(200).send("Ville supprimée avec succès");
    }

})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
