import mongoose from 'mongoose';
const Schema = mongoose.Schema;


let accountSchema = new Schema({
  email:{
    type: 'String',
    required: true,
    min:6,

  },

  password:{
    type: 'String',
    required: true,
    max:1024,
    min:6
  },
  name:{
    type: 'String',
    required: true,
    max:255,
    min:6
  },
  date:{
    type:Date,
    default:Date.now
  }
});


module.exports = mongoose.model('Account', accountSchema);
