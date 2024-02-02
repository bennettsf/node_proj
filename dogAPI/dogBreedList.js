// server.js
import express from 'express';

const app = express();
const port = 3000;

app.get('/dogbreeds', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');
        if (!response.ok) {
            throw new Error('Network response was not okay: ' + response.status);
        }
        const dogData = await response.json();
        //initialize breed list
        const dogBreedList = []
        //parse dogData for each breed and append it to the list
        dogData.data.forEach(dog => {
            const breed = dog.attributes.name
            dogBreedList.push(breed)
        });

        console.log(dogBreedList)
        //create an HTML string of the dog breeds that will be presented to '/dogbreeds'
        const htmlContent = createHTMLList(dogBreedList);
        //send the HTML to the page
        res.send(htmlContent);
    } catch (error) {
        console.error('Error fetching dog breeds:', error);
        res.status(500).send('Internal Server Error');
    }
});

function createHTMLList(breedNamesArray) {
    //map the array of breeds to the li HTML string
    const listBreeds = breedNamesArray.map(name => `<li>${name}</li>`).join('');
    //create the full HTML string with h1 and ul tags
    const htmlContent = `<h1>Dog Breeds List</h1><ul>${listBreeds}</ul>`;
    return htmlContent;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});