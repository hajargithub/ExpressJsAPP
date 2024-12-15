/* const express = require('express');
const app = express();

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express!');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
}); */
const express = require('express');
const { exec } = require('child_process'); // Importer exec pour exécuter des scripts
const fs=require('fs/promises')
 
const app = express();

// Middleware pour logger chaque requête
app.use((req, res, next) => {
    console.log(`Reçu une requête ${req.method} à ${req.url}`);
    next(); // Passe à la route suivante
});

app.get('/', (req, res) => {
    res.send('Page d\'accueil');
});

app.get('/about', (req, res) => {
    res.send('Page À propos');
});
// Route to serve the users.json file content
app.get('/users.json', async (req, res) => {
    try {
        // Read the users.json file
        const data = await fs.readFile('./users.json', 'utf-8');
        res.json(JSON.parse(data)); // Send the parsed JSON as the response
    } catch (error) {
        console.error('Error reading users.json:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
/* app.get('/users.json', async (req, res) => {
    try {
        // Exécuter le script GetUsers.js
        exec('node GetUsers.js', async (error, stdout, stderr) => {
            if (error) {
                console.error('Erreur lors de l\'exécution de GetUsers.js:', stderr);
                return res.status(500).send('Erreur lors de la récupération des utilisateurs');
            }

            // Lire le contenu de users.json après l'exécution de GetUsers.js
            try {
                const users = await fs.readFile('./users.json', 'utf-8');
                res.json(JSON.parse(users)); // Envoyer les données JSON en réponse
            } catch (readError) {
                console.error('Erreur lors de la lecture du fichier users.json:', readError.message);
                res.status(500).send('Erreur interne lors de la lecture des données');
            }
        });
    } catch (err) {
        console.error('Erreur inattendue:', err.message);
        res.status(500).send('Erreur interne du serveur');
    }
}); */
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
