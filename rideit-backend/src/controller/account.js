import  mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import config from '../config';
import middleWare from '../middleware/authMiddleware';





export default ({ config, db }) => {
  let api = Router();

  // '/v1/account'
  api.get('/', (req, res) => {
    res.status(200).send({ user: req.user });
  });

  // '/v1/account/register'
  api.post('/register',async function(req, res){


    const emailExist= await Account.findOne({email:req.body.email});
    if(emailExist){
      return res.status(400).send("Email Already Exists");
    }

    //HASH password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

     let account =new Account({
       name:req.body.name,
       password:hash,
       email:req.body.email
      });


     try {
       const savedUser= account.save();
       res.json({message:"User Sucessfully Saved"});
     }catch(err){
       res.status(400).send(err);
     }

  });

  api.post('/login',async (req,res)=>{
    //check if email is correct
    const user= await Account.findOne({email:req.body.email});
    if(!user){
      return res.status(400).send("Email is Wrong");
    }
    //check if password is correct
    const validatePassword= bcrypt.compareSync(req.body.password, user.password);
    if(!validatePassword){
      return res.status(400).send("Password is Wrong");
    }
    //create and assign tokken
    const token= jwt.sign({_id:user._id},config.TokenSecret);
    res.header('auth-token',token).send(token);

  });



  return api;
}
