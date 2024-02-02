// server.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/dogbreeds/:dogid', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        const dogID = req.params['dogid']
        if (!response.ok) {
            throw new Error('Network response was not okay: ' + response.status);
        }
        const dogData = await response.json();
        let foundDog = false
        
        dogData.data.forEach(dog => {
            if (dog.id === dogID) {
                foundDog = true
                const htmlContent = createHTMLData(dog)
                res.send(htmlContent)
                return false
            }          
        });

        if (!foundDog) {
            res.send('Dog ID not found')
        }
        
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
        res.status(500).send('Internal Server Error');
    }
});

function createHTMLData(dog) {
    return `<h1>${dog.attributes.name}</h1><h2>Male Weight: ${dog.attributes.male_weight.min} | Female Weight: ${dog.attributes.female_weight.min} | Life Expectancy: ${dog. attributes.life.min} years | Hypoallergenic: ${dog.attributes.hypoallergenic}</h2><p>${dog.attributes.description}</p>`
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});