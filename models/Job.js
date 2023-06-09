const mongoose = require('mongoose')


const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxLength: 50
    },
    position: {
      type: String,
      required: [true, 'Please provide position_name'],
      maxLength: 100
    },
    status: {
      type: String,
      enum: ['interwie', 'declined', 'pending'],
      default: 'pending'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    }
  },
  { timestamps: true }
)


module.exports = mongoose.model('Job', JobSchema)