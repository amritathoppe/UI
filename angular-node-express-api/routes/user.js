 var express = require('express');
var router = express.Router();
var userService = require('../services/service.user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
  res.json({error : "Invalid ID"});
});
 /* POST to register a new user */
 router.post("/save/registration", function (req, res) {
   console.log("Saving Registration Information");
   console.log(req.body);

   //const user = await userService.create(req.body);
   const user =  async ()=>
   {
      const result = await (userService.create(req.body));
    return result;
   }
   user().then(function(result){
       console.log("From the userService after registration: RESOLVED");
       console.log(result);
       return res.status(200).json({ user: result });//it works but user is empty

   }).catch(function(err){
       console.log("From the userService after registration:REJECTED");
       console.log(err);
       return res.status(401).json({ error: "Username Already exsists!" });
   });
 });

 /* POST to login a user */
 router.post("/login", function (req, res) {
   console.log("Checking Login Credentials");
   console.log(req.body);
     const user =  async ()=> {
         const result = await userService.verify(req.body);
         return result;
     }
     user().then(function(result){
         console.log("From the userService after registration: RESOLVED");
         console.log(result);
         return res.status(200).json({ user: result });//it works but user is empty

     }).catch(function(err){
         console.log("From the userService after registration:REJECTED");
         console.log(err);
        
         return res.status(401).json({error : "Incorrect Credentials"});
     });

 });

module.exports = router;
