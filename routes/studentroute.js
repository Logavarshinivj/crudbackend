const express = require("express");

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

  router.post("/register", async (request, response) => {
    let user=new User(request.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password;
    response.status(200).send(result);
  })

router.post("/login",async (request, response) => {
  if(request.body.password && request.body.email){
    let user=await User.findOne( request.body).select("-password")
    if(user){
      response.send(user)
    }
    else{
      response.send({message:"no user found"})
    }
  }
  else{
    response.send({message:"no user found"})
  }
  }
)
  
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

