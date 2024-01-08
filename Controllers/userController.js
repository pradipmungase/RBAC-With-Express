import multer from 'multer';
import path from 'path';
import User from "../Model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage }).single('photo');

class homeController {

  static createUser = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(500).send('Something went wrong with file upload');
        }

        const { firstName, lastName, mobile , email , password ,gender} = req.body;
        
        const photoPath = req.file ? req.file.path : null;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          firstName,
          lastName,
          mobile,
          email,
          password: hashedPassword,
          gender,
          photo: photoPath
        });

        try {
            await newUser.save();
            res.json({ message: 'User created successfully', newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error saving user to database', error: error.message });
        }
        
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
    }
  }

  static loginUser = async (req, res) => {
    try {
      const {  email , password ,gender} = req.body;
      console.log(email);
      // Check if user with provided email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare provided password with hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      // Send the token in the response
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  }

  static getUser = async (req, res) => {
    try {
      // Get the token from the request headers
      const token = req.headers.authorization.split(' ')[1];
  
      // Verify the token
      const decodedToken = jwt.verify(token, 'your-secret-key'); // Use the same secret key used for signing
  
      // Extract the userId from the decoded token
      const userId = decodedToken.userId;
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send the user data in the response
      res.json({ user });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  }
  
  
}

export default homeController;
