import express from 'express'

const app = express()
app.set('port', process.env.PORT || 3000);

app.get('/foo', (req, res, next) => {

    if (Math.round(Math.random())){
        next()
    }

    res.type('text/plain');
     res.send("sometimes this...")
});

app.get('/foo', (req, res) => {
    res.type('text/plain');
    res.send("and sometimes that...")
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404 - Not Found");
})

app.listen(app.get('port'), () => {
    console.log("Express Started on http://localhost:3000")
})