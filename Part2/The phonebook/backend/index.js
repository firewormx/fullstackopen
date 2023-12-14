const express = require(`express`);
const app = express();
const cors = require(`cors`);


const requestLogger = (request, response, next) =>{
    console.log(`Method:`, request.method);
    console.log(`Path: `, request.path);
    console.log(`Body: `, request.body);
    console.log(`--`);
    next()
    }

    app.use(cors());
    app.use(express.json())
    app.use(requestLogger);
    app.use(express.static(`dist`));

let persons = {
    "persons": [
      {
        "name": "Aiko sander",
        "number": "4567-0987",
        "id": 27
      },
      {
        "name": "Alice Wong",
        "number": "909090",
        "id": 29
      },
      {
        "name": "Alice Geeker",
        "number": "1232134",
        "id": 30
      },
      {
        "name": "Botman daniel",
        "number": "0930932\\",
        "id": 31
      },
      {
        "name": "Haoareyoulei",
        "number": "083450987",
        "id": 32
      },
      {
        "name": "hiloe",
        "number": "1111111",
        "id": 33
      },
      {
        "name": "botman-test",
        "number": "",
        "id": 34
      }
    ]
  }
app.get(`/`, (request, response)=>{
response.send(`<h1>Hello World!</h1>`)
})

app.get(`/api/persons`, (request, response)=>{
response.json(persons);
})

const PORT = process.env.PORT || 3007
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
