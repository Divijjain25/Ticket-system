const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
    try {
    
      const id = req.user.id;
  
      const user = await User.findById(id).select('-password');
  
      if (user) {
        res
          .status(201)
          .json({ message: "User profile fetched successfully", user: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const updateProfile = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const id = req.user.id;
  
      const updateData = {};
  
      // Add fields to update object only if they are provided
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (email) updateData.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports={getProfile,updateProfile}