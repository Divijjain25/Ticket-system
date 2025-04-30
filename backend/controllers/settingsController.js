const Settings = require('../models/Settings')


const getSettings = async (req, res) => {
    try {
      let settings = await Settings.findOne();
      
      // If no settings found, create default one
      if (!settings) {
        settings = await Settings.create({});
      }
  
      res.status(200).json({message:"Settings fetched successfully" ,settings });
    } catch (err) {
      console.error("Get Settings Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

const updateSettings = async (req, res) => {
    try {
      const updates = req.body;
  
      let settings = await Settings.findOne();
      if (!settings) {
        settings = await Settings.create({});
      }
  
      
      if (updates.missedChatTimer) {
        const { hours = 0, minutes = 0, seconds = 0 } = updates.missedChatTimer;
  
        const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
        
        settings.missedChatTimerInSeconds = totalSeconds;
        delete updates.missedChatTimer; 
      }
  
      
      Object.keys(updates).forEach(key => {
        settings[key] = updates[key];
      });
  
      await settings.save();
  
      res.status(200).json({ message: "Settings updated successfully", settings });
    } catch (err) {
      console.error("Update Settings Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  module.exports={getSettings,updateSettings}