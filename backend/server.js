import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import connectDB from "./DBconnection.js";
import { RegisterForm } from "./Schemas.js";
import { QueryForm } from "./Schemas.js"
import { ResumeDataSchema } from "./Schemas.js"; 
import { ratingdata } from "./Schemas.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);



const qform = mongoose.model('QueryForm', QueryForm)
const rform = mongoose.model('RegisterForm', RegisterForm)
const uData = mongoose.model("ResumeData", ResumeDataSchema)
const rateData = mongoose.model("Rating", ratingdata)


app.get('/hello', (req, res) => {
    res.send("Hello from server");
});

app.post('/dataform',async (req,res)=>
{
    try{

        const resposne  = new  uData(req.body)

        await resposne.save();
        res.json({message:"successfull"})

    }catch(error)
    {
        console.log(error)
    }
   
})

app.post('/signup', async (req, res) => {
    const { name, phone , email, password } = req.body;
    
    console.log(req.body);

    try {
        const newUser = new rform({ name, phone , email , password});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    console.log(req.body);

    try {
        const newUser = new qform({ name, email, message });
        await newUser.save();
        res.status(201).json({ message: 'Query Summited Successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '../frontend', 'index.html'));
});


app.post('/verifyemail',async(req,res)=>{
const {email}=req.body
console.log(email)
try
{
    const response=await rform.find({email:email})
    console.log(response);
    res.json(response)
}
catch(error)
{
    console.log
}

})



app.post('/verifyphone',async(req,res)=>{
  const {phone}=req.body
  console.log(phone)
  try
  {
      const response=await rform.find({phone:phone})
      console.log(response);
      res.json(response)
  }
  catch(error)
  {
      console.log
  }
  
  })
  


app.get('/allusers', async (req, res) => {
    try 
    {
        const allUsers = await rform.find(); // `rform` is your mongoose model
        res.json(allUsers);
    } catch (error) 
    {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/deleteuser/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await rform.findByIdAndDelete(id);
      if (deleted) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  app.get('/allquery2', async (req, res) => {
    try 
    {
        const allquery = await qform.find(); // `rform` is your mongoose model
        res.json(allquery);
    } catch (error) 
    {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/resume', async (req, res) => {
  const { email } = req.query;
  try {
    const resumes = await uData.find({ "personalDetails.email": email })
    alert(resumes)
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


app.delete("/deletequery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await qform.findByIdAndDelete(id);
      if (deleted) {
        res.json({ message: "Query deleted successfully" });
      } else {
        res.status(404).json({ message: "Query not found" });
      }
    } catch (err) {
      console.error("Error deleting Query:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  
  app.get("/allresume2", async (req, res) => {
    try {
      const resumes = await uData.find(); 
      res.json(resumes); 
    } catch (err) {
      console.error("Error fetching all resumes:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
app.delete("/deleteresume/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await uData.findByIdAndDelete(id);
      if (deleted) {
        res.json({ message: "Resume deleted successfully" });
      } else {
        res.status(404).json({ message: "Resume not found" });
      }
    } catch (err) {
      console.error("Error deleting Resume:", err);
      res.status(500).json({ message: "Server error" });
    }
  });


app.get('/allfeedback', async (req, res) => {
  try 
  {
      const FeedBack = await rateData.find(); 
      res.json(FeedBack);
  } catch (error) 
  {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});

app.post('/feeling',async (req,res)=>
  {
      try{
  
          const resposne  = new  rateData(req.body)
  
          await resposne.save();
          res.json({message:"Thank You For FeedBack"})
  
      }catch(error)
      {
          console.log(error)
      }
     
  })


  // Assuming you're using Express and Mongoose
app.post('/changepassword', async (req, res) => {
  const { email, phone, newPassword } = req.body;

  try {
      const user = await rform.findOne({ email, phone: phone });

      if (!user) {
          return res.status(404).json({ message: "User not found with provided email and phone." });
      }

      user.password = newPassword; // Consider hashing with bcrypt in production
      await user.save();

      res.json({ message: "Password updated successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Try again later." });
  }
});




const PORT = 8861;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
