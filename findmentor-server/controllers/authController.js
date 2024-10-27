const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully. Awaiting admin approval.' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user: ' + error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(401).json({ message: 'Invalid credentials or not verified' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in: ' + error.message });
  }
};
