// make changes for 3.13 - 3.18
require(`dotenv`).config();
const express = require(`express`);
const app = express();
const cors = require(`cors`);

const Phonebook = require(`./models/phonebook`);
app.use(express.static(`dist`));


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


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

    const errorHandler = (error, request, response, next) =>{
      console.error(error.message);

     if(error.name === `CastError`){
     return  response.status(400).send({error: `malformed id`})
     }else if(error.name ===  `ValidationError`){
      return response.status(400).json({error: error.message})
     }
     next(error);
    }

// let persons =  [
//       {
//         "name": "Aiko sander-backend",
//         "number": "4567-0987",
//         "id": 27
//       },
//       {
//         "name": "Alice Wong",
//         "number": "909090",
//         "id": 29
//       },
//       {
//         "name": "Alice Geeker",
//         "number": "1232134",
//         "id": 30
//       },
//       {
//         "name": "Botman daniel",
//         "number": "093093200",
//         "id": 31
//       },
//       {
//         "name": "Haoareyoulei",
//         "number": "083450987",
//         "id": 32
//       },
//       {
//         "name": "hiloe",
//         "number": "1111111",
//         "id": 33
//       },
//       {
//         "name": "botman-backend data",
    //     "number": "",
    //     "id": 34
    //   }
    // ]
  
app.get(`/`, (request, response)=>{
response.send(`<h1>Hello World!</h1>`)
})

app.get(`/api/persons`, (request, response)=>{
  Phonebook.find({}).then(persons =>{
    response.json(persons);
  })

})
// const generatedId = () =>{
//     const maxId= persons.length > 0
//     ? Math.max(...persons.map(person =>person.id))
//     :0
// return maxId + 1;
// }

  app.post(`/api/persons`, (request,response, next)=>{
    const body = request.body;
   if(!body.name || !body.number){
    return response.status(400).json({error: `name or number missing`})
   }
   const phonebook= new Phonebook({
    name: body.name,
    number: body.number
    // id: generatedId()
   })
//  persons = persons.concat(newPerson);
//  response.json(newPerson);

phonebook.save().then(returnedPerson =>{
  response.json(returnedPerson)
}).catch(error => next(error))
  });

  app.get(`/api/persons/:id`, (request, response, next)=>{
    Phonebook.findById(request.params.id).then(result =>{
      if(result){
        response.json(result)
      }else{
        response.status(404).end()
      }
    }).catch(error => next(error))
//     const id = Number(request.params.id);
//     console.log(id);
//     const person = persons.find(person => {
//         return person.id === id});
//       person ? response.json(person) : response.status(404).end()
// response.json(person);
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
  .then(result =>{
    response.status(204).end()
  })
  .catch(error => next(error))
    // const id = Number(request.params.id);
    // console.log(id)
    // persons = persons.filter(person => person.id !== id)
  
    // response.status(204).end()
  })

  app.put(`/api/persons/:id`, (request, response, next)=>{
    const {name, number} = request.body;

   Phonebook.findByIdAndUpdate(
    request.params.id, 
    {name, number}, 
    {new: true})
   .then(updatedPerson =>{
   response.json(updatedPerson)
   })
   .catch(error => next(error))
  })


app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
