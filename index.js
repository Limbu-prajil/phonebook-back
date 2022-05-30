const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
]

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
      res.send(person)
    } else {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    console.log('pois')
    const id = Number(req.params.id)
    newpersons = persons.filter(person => person.id !== id)
    res.send(newpersons)
    res.status(204).end()
})

const generateId = () => {
  const newId = Math.random() * Math.random()
  return Math.trunc(newId) + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (body.name === undefined) {
      return res.status(400).send({error: 'name must be unique'})
    }
    if (body.number === undefined) {
      return res.status(400).send({error: 'number must be unique'})
    }
    const entry = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons = persons.concat(entry)
    res.json(entry)
})

const PORT =  3001
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})