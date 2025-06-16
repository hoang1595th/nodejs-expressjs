// const { readUsers, writeUsers } = require('../helpers/file');
const User = require('../models/user.model');
const { validateUser } = require('../utils/validator');
const createError = require('../utils/createError');

exports.getAllUsers = async (req, res, next) => {
  try {
    // const users = readUsers();
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    // const users = readUsers();
    // const user = users.find((u) => u.id === parseInt(req.params.id));
    const user = await User.findById(req.params.id);
    if (!user) throw createError(404, 'Không tìm thấy người dùng');
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  // const errors = validateUser(req.body);
  // if (errors.length > 0) {
  //   return res.status(400).json({ errors });
  // }

  // const users = readUsers();
  // const newUser = {
  //   id: users.length ? users[users.length - 1].id + 1 : 1,
  //   ...req.body,
  // };
  // users.push(newUser);
  // writeUsers(users);
  // res.status(201).json(newUser);


  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) return next(createError(400, errors.join(', ')));

    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  // const errors = validateUser(req.body);
  // if (errors.length > 0) {
  //   return res.status(400).json({ errors });
  // }

  // const users = readUsers();
  // const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  // if (userIndex === -1) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

  // users[userIndex] = {
  //   ...users[userIndex],
  //   ...req.body,
  // };
  // writeUsers(users);
  // res.json(users[userIndex]);


  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) return next(createError(400, errors.join(', ')));

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) throw createError(404, 'Không tìm thấy người dùng');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  // let users = readUsers();
  // users = users.filter((u) => u.id !== parseInt(req.params.id));
  // writeUsers(users);
  // res.json({ message: 'Xoá thành công' });

  
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw createError(404, 'Không tìm thấy người dùng');
    res.json({ message: 'Xoá thành công' });
  } catch (err) {
    next(err);
  }
};
