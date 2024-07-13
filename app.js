const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();

const PORT=process.env.PORT || 3000;

// middleware 
app.use(express.static('./public'));


app.listen(PORT, ()=>{
    console.log(`Server is listen on port ${PORT}..`);
});

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

