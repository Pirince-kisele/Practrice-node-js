const mongoose = require('mongoose');
const { type } = require('os');
//create the schema in mongo database with the object 
const CustomerSchema = new mongoose.Schema({
name: {
   type: String,
   require: true
},
company: String,
times: Date

});
// connect the schema we create with the mongodb and the module .exports make it evalable to use in the app js when we are going to require it 
module.exports =  Customers = mongoose.model('Peoples', CustomerSchema)