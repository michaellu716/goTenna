const express = require('express');
const app = express();
var cors = require('cors');
const images = require('./images');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors allow
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

//get all photos
app.get('/api/photos', (req, res) => {
    var page = 1;
    console.log(req.query.pageNo)
    var page = parseInt(req.query.pageNo)
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    var limit = 20;
    var len = images.length;
    var data = paginate(images, limit, page);
    res.json(data);
})
function paginate (array, page_size, page_number) {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
}
//get single photo based on id
app.get('/api/photos/id/:id', (req, res) => {
    //if no image with id exists return status 400
    const found = images.some(image => image.id === parseInt(req.params.id));
    if(found){
        res.send(images.filter(image => image.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({ msg: `Image not found with id of ${req.params.id}`})
    }
})
    
app.get('/', (req, res) => {
    res.send('<h1>hey</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(PORT)