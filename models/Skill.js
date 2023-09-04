const {Schema, model, ObjectId} = require('mongoose');

const SkillSchema = new Schema(
  {skills: [
      {
        skillName: {type: String},
        level: {type: Number},
      }]
  }
)

module.exports = model('Skill', SkillSchema)
