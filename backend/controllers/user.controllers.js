import { User } from "../models/user.model.js";
import bcrypt, { truncates } from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Somting is missing",
        success: false,
      });
    }
    const file =req.file;
    const fileUri=getDataUri(file)
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist ith this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Somting is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or password",
        success: false,
      });
    }

    const isPassordMatch = await bcrypt.compare(password, user.password);
    if (!isPassordMatch) {
      return res.status(400).json({
        message: "Incorrect Email or password",
        success: false,
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesnot exist with current role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcoe back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { axAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;


    const fileUrl=getDataUri(file);

    // const cloudResponse=await cloudinary.uploader.upload(fileUrl.content)
    const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);



    let skillsArray;
    if(skills){
      skillsArray = skills.split(",");
    }
   
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullname) {
      user.fullname = fullname;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (email) {
      user.email = email;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skillsArray) {
      user.profile.skills = skillsArray;
    }

    if(cloudResponse){
      user.profile.resume=cloudResponse.secure_url
      user.profile.resumeOrignalName=file.originalname
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
