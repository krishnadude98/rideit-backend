const jwt= require('jsonwebtoken');
import config from '../config';

module.exports =function(req,res,next){
  const token= req.header('auth-token');
  if(!token){
      return res.status(401).json({message:"Access Denied"});
  }
  try{
    const verified= jwt.verify(token,config.TokenSecret);
    req.user = verified;//verified is id
    next();

  }catch(e){
      res.status(400).json({message:"Invalid Token"});
  }
}
