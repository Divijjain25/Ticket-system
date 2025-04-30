const jwt = require('jsonwebtoken')
const User= require('../models/User')

const protect=(req,res,next)=>{
    const token=req.headers.authorization;
    // console.log(token);
    
    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
      }
      next();
    } catch (err) {
      console.error("isAdmin middleware error:", err);
      res.status(500).json({ message: "Server error while checking role" });
    }
  };

  const isSuperAdmin = async (req, res, next) => {
    try {
      const superAdmin = await User.findOne({ role: "admin" }).sort({ createdAt: 1 });
  
      req.isSuperAdmin = String(req.user.id) === String(superAdmin._id);
      next();
    } catch (err) {
      console.error("isSuperAdmin middleware error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports={protect,isAdmin,isSuperAdmin};