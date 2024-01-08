import mongoose from 'mongoose';

const validGenders = ['Male', 'female', 'Other'];

const roleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
});

const role = mongoose.model('role', roleSchema);

export default role;

