const User = require('../models/User');
const bcrypt = require("bcryptjs");
const auth = require("../auth");


module.exports.registerUser = (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    const isValidEmail = (email) => {
        return email.includes('@');
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };

    const { email, password } = req.body;

    if(!isValidEmail(email)) {
        return res.status(400).send({ message: 'Email invalid'});
    } else if(!isValidPassword(password)) {
        return res.status(400).send({ message: 'Password must be atleast 8 characters' });
    }

    return newUser.save()
    .then((result) => res.status(201).send({ message: 'User successfully registered', result}))
    .catch(err => errorHandler(err, req, res))
};



module.exports.loginUser = (req, res) => {
  if(!req.body.email.includes('@')) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  return User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) { 
        return res.status(404).send({ message: "Email does not exist" });
      } else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
            if (isPasswordCorrect) {
                    return res.status(200).send({ message: "User logged in successfully", access : auth.createAccessToken(result)});
            } else {
                return res.status(401).send({ message: "Incorrect email or password" });
            }
      }
    })
    .catch((err) => errorHandler(err, req, res));
};
