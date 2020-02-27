const app = require('./src/config/custom-express');

app.listen(process.env.PORT || 3001, () =>{
    console.log("Server active at http://localhost:3000")
})