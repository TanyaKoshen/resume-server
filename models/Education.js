const {Schema, model, ObjectId} =require('mongoose');

const Education = new Schema({
  schoolName: {type: String},
  year: {type: String},
  major: {type: String},
  diploma: {type: String},
  place: {type: String},
})

module.exports = model('Education', Education)
