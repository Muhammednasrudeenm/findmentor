const User = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users: ' + error.message });
  }
};

// Approve a user
exports.approveUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log("User before approval:", user); // Log before update
      user.isVerified = true;
      await user.save();
      console.log("User after approval:", user); // Log after update
  
      res.status(200).json({ message: 'User approved', user });
    } catch (error) {
      console.error('Error approving user:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error approving user' });
    }
  };
 
    

// Reject/Delete a user
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.userId); // Delete the user
    res.status(200).json({ message: 'User rejected' });
  } catch (error) {
    console.error('Error rejecting user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error rejecting user' });
  }
};
