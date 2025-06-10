import mongoose from "mongoose";

export const RegisterForm = new mongoose.Schema({
    name:{
        type:String,   
        required:true
    },
    phone:{
        type:Number, 
        required:true 
    },
    email:{
        type:String, 
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
})

export const QueryForm = new mongoose.Schema({
    name:{
        type:String,   
    },
    email:{
        type:String,  
    },
    message:{
        type:String, 
    },
    
})

const PersonalDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    objective: { type: String },
    photo: { type: String } // base64 or file URL
});

const EducationSchema = new mongoose.Schema({
    tenth_percentage: { type: String },
    twelfth_percentage: { type: String },
    graduation_percentage: { type: String },
    post_graduation_percentage: { type: String }
});

const AchievementsSchema = new mongoose.Schema({
    hobbies: { type: String },
    certificates: { type: String }
});

const WorkExperienceSchema = new mongoose.Schema({
    internship_company: { type: String },
    internship_description: { type: String },
    internship_duration: { type: String },
    company_name: { type: String },
    job_title: { type: String },
    date_of_joining: { type: String },  // or Date if you want real date
    job_description: { type: String }
});

const SkillsSchema = new mongoose.Schema({
    technical_skills: { type: String },
    soft_skills: { type: String }
});

export const ResumeDataSchema = new mongoose.Schema({
    useruniquedetail:{
        type:String,
        required:true
    },
    templateid:{
        type:String,
        required:true
    },
    personalDetails: PersonalDetailsSchema,
    education: EducationSchema,
    achievements: AchievementsSchema,
    workExperience: WorkExperienceSchema,
    skills: SkillsSchema
});


export const ratingdata = new mongoose.Schema({
    email: { type: String, required: true },
    photo: { type: String } ,
    reaction: { type: String , required: true }    
});