const express = require('express');
const app = express();
// use this 2 code in the head in order to be able to use the body parser from the post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const PORT = 3000;

const people =[
  {
    name: 'John',
    age: 30
  },
  {
    name: 'Jane',
    age: 25
  }
]



app.get('/', (req, res) => {
  
  res.send(people.map(person => person.name).join(', '));
})
app.post('/api/customer', (req, res) => {
  req.body
  res.send('Hello World');
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})