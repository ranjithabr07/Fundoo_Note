import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

//create new user
export const newUserRegister = async (body) => {
  // Check if this user already exisits
  const data = await User.find({ email: body.email });
  if (data.length !== 0) {
    throw new Error('Already Exist EmailId');
  } else {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(body.password,saltRounds)
    body.password = hashpassword
    // Insert the new user if they do not exist yet
    const data = await User.create(body);
    return data;
  }
};

//login user
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  // Check if email id present or not
  if (data.length !== 0) {
    console.log('Password',body.password);
    const result = await bcrypt.compare(body.password,data.password)
    if (result) {
      var token = jwt.sign({ 'id' : data._id,'firstname': data.firstname, 'email' : data.email }, process.env.SECREAT_KEY);
      return token;
    } else {
      throw new Error('Enter invalid Password');
    }
  } else {
    throw new Error('Enter invalid EmailId');
  }
};