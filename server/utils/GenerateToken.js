import jwt from 'jsonwebtoken';

const generateToken= (userid)=>{
    if(!userid) {
        throw new Error('User ID is required to generate token');
    }
    // eslint-disable-next-line no-undef
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
export default generateToken;