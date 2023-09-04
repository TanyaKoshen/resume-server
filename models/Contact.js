const {Schema, model, ObjectId} =require('mongoose');

const Contact = new Schema({
  phone: {type: String},
  website:{type: String},
  address: {type: String}
})

module.exports = model('Contact', Contact)
