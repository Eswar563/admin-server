const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User.js');

const {registerUserSchema,loginUserSchema} = require('../joi-validations/authSchema.js');

exports.registerUser = async (request, response) => {
  try{
    const { email, password } = await registerUserSchema.validateAsync(request.body);
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const newUser = new User ({
        email: email,
        password: hashedPassword,
      });
  
      const result = await newUser.save();
      response.send(`Created new user with ${result._id}`);
    } else {
      response.status(400);
      response.send("User already exists");
    } 
  } catch(error) {
    console.error(error);
    }
}



exports.loginUser = async (req, res) => {
  try{
    const { email, password } = await loginUserSchema.validateAsync(req.body);
    
    // Find user with matching username
    const dbUser = await User.findOne({ email });
    
    if (dbUser === null) {
        // User not found
        res.status(400).send('Invalid user');
    } else {
        // Compare password with hashed password in database
        const isPasswordMatched = bcrypt.compare(password, dbUser.password);
        if (isPasswordMatched) {
            const payload = {
                email: email,
              };
              const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
              res.send({ jwtToken });
        // Password matched
        // res.send('Login success!');
        } else {
        // Password didn't match
        res.status(400).send('Invalid password');
        }
      } 
    } catch(error) {
        console.error(error);
    }
    }


    
    
//User Profile
exports.profile = async (request, response) => {
  const { email } = request;
  try {
    console.log('user>>>>>>>>', User.firstName)
    const userDetails = await User.findOne({ email });
    response.send(userDetails);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};


//updating profile-details based on user._id

exports.editProfile = async (request, response) => {
  const { userId } = request.params;
  const firstName = request.body.firstName;
  // const { firstName } = userDetails;

  try {
    const user = await User.updateOne({ id : userId },{ $set: { firstName : firstName } });

    if (!User) {
      return response.status(404).json({ error: 'User not found' });
    }

    
    user.firstName = firstName;

    await user.save();

    response.send('Userdetails Updated Successfully');
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};


