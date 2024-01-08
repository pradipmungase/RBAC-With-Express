import mongoose from 'mongoose';

const validGenders = ['Male', 'female', 'Other'];

const userSchema = new mongoose.Schema({
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
  mobile: {
    type: String, // Mobile numbers are usually best stored as strings
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Check if it's exactly 10 digits
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Simple email format validation
        return /\S+@\S+\.\S+/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: validGenders // Use enum to specify valid values
  },
  photo: {
    type: String, // Assuming the photo is stored as a URL or file path
    required: true,
    trim: true
  }
});

const user = mongoose.model('user', userSchema);

export default user;

