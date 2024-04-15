const express = require('express');
// import the mongodb in our app
const mongoose = require('mongoose')

// require the model in order to use it
const Customer = require('./models/Customer.js')
//require the lodash to use the .once function
const lodash = require('lodash');
const { error } = require('console');
const _ = lodash();


const app = express();
// add this setap to the mongoose
mongoose.set('strictQuery', false)

// use this 2 code in the head in order to be able to use the body parser from the post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// require the dotenv en config it for it to work when we run the npm start
if(process.env.NODE_ENV !== 'production'){
 require('dotenv').config();
}


// set the port with the process.env.PORT then we can use this code to run the app PORT=3001 or 3005 
const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;


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

// create the instance of the customer here then we gonna use it inside the get router for the home page
const customer = new Customer({
name: "pirince",
company: "Tyson",
times: Date.now()

})
//_.once(customer.save())



app.get('/', (req, res) => {
  // the map method is used to create a new array with the results of calling a provided function on every element in the calling array
  //res.send(people.map(person => person.name).join(', '));
  res.send('welcome')
})
//find user by id
app.get('/api/customer/:id', async(req, res) => {

  console.log({requestParams: req.params,
  requestQuery: req.query
  
  })
  try{
  const {id: customerId} = req.params;
  console.log(customerId)
  const customer = await Customer.findById(customerId)
  console.log(customer)
  if(!customer){
    res.status(400).json({error: 'User not found'})
  }else{
     res.json({customer})
  }
 
  }catch(e){
  res.status(500).json({error:'some thing went wrong'})
  }
  
})
//update using the put methode
app.put('/api/customer/:id', async(req, res) => {
  try{
  const customerId = req.params.id;

  const result = await Customer.replaceOne({_id: customerId})
  console.log(result)
  res.json({updatedCount: result.modifiedCount})
 
  }catch(e){
  res.status(500).json({error:'some thing went wrong'})
  }
  
})


// get data from the data base
app.get('/api/customer', async(req, res) => {
 // console.log(await mongoose.connection.db.listCollections().toArray())
  try { //the try catch help to execute the code and if something goes wrong then the catch will send the error message to the broser
    const result = await Customer.find();
      res.json({"people": result});
  } catch (error) {
    res.status(500).json({error: error.message})
  }

 

})
//customer.save();

// add people to the data base using the post methode 
app.post('/api/customer', async (req, res) => {
  let requests = req.body
 const customer = new Customer(requests)
 try {
   await customer.save();
  res.status(201).json({customer})
 } catch (error) {
  res.status(400).json({error: error.message});
 }
})





// we creat the ansyc function to connect the app to the database and after then the app will start 
const conection = async()=>{
  try {
    //this connection come from .env 
     await mongoose.connect(CONNECTION);

   app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  } catch (error) {
    console.log(error.message)
  }
 
}
conection();