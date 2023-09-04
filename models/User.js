const {Schema, model, ObjectId} =require('mongoose');

const User = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isActivated: {type: Boolean, required: true, default: false },
  activationLink: {type: String},
  about: {type: String, required:false},
  avatar: {type: String, required: false},
  contact: {type: ObjectId, ref: 'Contact'},
  resume: {type: ObjectId, ref:'Resume'}
})

module.exports = model('User', User)
