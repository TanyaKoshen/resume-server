const {Schema, model, ObjectId} =require('mongoose');

const Experience = new Schema({
  companyName: {type: String},
  date: {type: String},
  location: {type: String}
})

module.exports = model('Experience', Experience)
