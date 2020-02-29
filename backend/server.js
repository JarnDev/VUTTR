const app = require('./src/config/custom-express');
const port = 3001
app.listen(process.env.PORT || port, () =>{
    console.log(`Server active at http://localhost:${port}`)
})