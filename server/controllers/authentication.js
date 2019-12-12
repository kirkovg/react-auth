import User from '../models/user';
import jwt from 'jwt-simple';
import config from '../config';

const createUserToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
};

export function signUp(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide both an email and a password'});
  }

  User.findOne({email}, (error, existingUser) => {
    if (error) {
      return next(error);
    }

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    const user = new User({
      email,
      password
    });

    user.save()
      .then(() => res.json({token: createUserToken(user)}),
      (error) => next(error));
  });
}

export function signIn(req, res) {
  res.send({token: createUserToken(req.user)});
}