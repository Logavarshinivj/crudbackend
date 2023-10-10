const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();
const Student = require("../modals/stud");
const User = require("../modals/user");

// router.post("/register", async (request, response) => {
//     try {
//       const { name, email, password } = request.body;
  
//       console.log(request.body);
//       const newuser = await User.create({
//         name,
//         email,
//         password,
//       });
//       newuser=newuser.toObject()
//       result=delete newuser.password
//       response.status(200).send(result);
//     } 
//     catch (err) {
//       response.status(404).send({ message: "error" });
//     }
//   });

//   router.post("/register", async (request, response) => {
//     let user=new User(request.body);
//     let result = await user.save();
//     result=result.toObject();
//     delete result.password;
//     response.status(200).send(result);
//   })

// router.post("/login",async (request, response) => {
//   if(request.body.password && request.body.email){
//     let user=await User.findOne( request.body).select("-password")
//     if(user){
//       response.send(user)
//     }
//     else{
//       response.send({message:"no user found"})
//     }
//   }
//   else{
//     response.send({message:"no user found"})
//   }
//   }
// )


  
router.get("/getallusers", async (request, response) => {
  try {
    const students = await Student.find({});
    response.send(students);
  } catch (err) {
    response.status(404).send({ message: "error" });
  }
});


router.post("/getallusers", async (request, response) => {
  try {
    const { name, age, gender, img, tmark, emark, smark, mmark, somark } =
      request.body;

    console.log(request.body);
    const newuser = await Student.create({
      name,
      age,
      gender,
      img,
      tmark,
      emark,
      smark,
      mmark,
      somark,
    });
    response.status(200).send(newuser);
  } catch (err) {
    response.status(404).send({ message: "error" });
  }
});

router.delete("/getallusers/:id", async function (request, response) {
  // response.send(request.params.id)
  const result = await Student.deleteOne({ _id: request.params.id });
  response.send(result);
});

router.get("/getuser/:id", async function (request, response) {
  // response.send(request.params.id)
  const result = await Student.findOne({ _id: request.params.id });
  if (result) {
    response.send(result);
  } else {
    response.send({ message: "no such record" });
  }
});

router.put("/update-user/:id", async function (request, response) {
  const result = await Student.updateOne(
    { _id: request.params.id },
    { $set: request.body }
  );
  response.send(result);
});

module.exports = router;


router.post("/newregister",async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUser= await User.findOne({email})
    if(oldUser){
      return  res.send({message:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const result = await newUser.save();
    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET);
    const userData = { _id: result._id, name: result.name, email: result.email};
    res.header('x-auth-token', token).send(userData);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Registration failed' });
  }
  
})



router.post("/newlogin",async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = user.generateAuthToken(); // create a JWT token for the user
    const userData = { _id: user._id, name: user.name, email: user.email };
    res.header('x-auth-token', token).send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
  

})