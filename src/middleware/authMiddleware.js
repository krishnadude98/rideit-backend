import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const TOKENTIME= 60*60*24*30;//30 DAYS;
const SECRET="W3 Hav3 th3 kn0w h0w";

let authenticate= expressJwt({secret:SECRET,algorithms: ['RS256']});

let generateAcessToken= (req,res,next)=>{
  req.token= req.token||{};
  req.token= jwt.sign({
    id:req.user.id
  },SECRET,{
    expiresIn:TOKENTIME
  });
  next();
}

let respond= (req,res)=>{
  res.status(200).json({
    user:req.user.username,
    token:req.token
  });
}

module.exports={
  authenticate,
  generateAcessToken,
  respond
}
