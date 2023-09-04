const {Schema, model, ObjectId} =require('mongoose');

const Resume = new Schema({
  summary: {type: String},
  user: {type: ObjectId, ref: 'User'},
  skill: {type: ObjectId, ref: 'Skill'},
  education: {type: ObjectId, ref: 'Education'},
  experience: {type: ObjectId, ref: 'Experience'}
})

module.exports = model('Resume', Resume)
