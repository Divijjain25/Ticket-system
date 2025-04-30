const User = require("../models/User");

const addMember = async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    if (!["admin", "member"].includes(role)) {
      return res.status(400).json({ message: "Role must be admin or team" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const inviter = await User.findById(req.user.id);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: inviter.password,
      role,
      invitedBy: inviter._id,
    });

    await newUser.save();

    const member = newUser.toObject();
    delete member.password;
    
    res.status(201).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} added successfully`, member:member });
  } catch (err) {
    console.error("Add Member Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await User.find().select("-password");
    res
      .status(200)
      .json({ message: "Team Members fetched successfully", teams: members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMember = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (user) {
      res.status(200).json({ message: "User fetched successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (targetUser.role === "admin" && !req.isSuperAdmin) {
      return res.status(403).json({ message: "Only super admin can delete other admins" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Delete Member Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (targetUser.role === "admin" && !req.isSuperAdmin) {
      return res.status(403).json({ message: "Only super admin can update other admins" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    res.status(200).json({
      message: "Member updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Member Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addMember, getAllMembers, getMember, deleteMember,updateMember };
