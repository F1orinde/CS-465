const User = require('../models/user');
const passport = require('passport');

const register = async (req, res) => {
  // Validate required fields
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  // Create new user record
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const login = (req, res) => {
  // Validate required fields
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    }

    return res.status(401).json(info);
  })(req, res);
};

module.exports = {
  register,
  login
};