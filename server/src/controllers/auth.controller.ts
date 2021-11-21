import { ILoginCredentials, ISignupCredentials, IUser } from '@la/core';
import { UserModel } from '@la/mongodb';
import { Request, Response, Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/login',
  async (_req: Request<any, any, ILoginCredentials>, _res: Response) => {
    try {
      const _credentials: ILoginCredentials = _req.body;
      if (!(_credentials.email && _credentials.password)) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('All Inputs Required');
      }

      const _user = await UserModel.findOne({ email: _credentials.email });
      if (!_user) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('Could not find user with that email');
      }

      const _passwordValid: boolean = await bcrypt.compare(
        _credentials.password,
        _user.password
      );
      if (!_passwordValid) {
        return _res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send('Invalid Password');
      }

      const _token = jwt.sign(
        {
          userId: _user._id,
          email: _user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );
      console.log(`Successfully logged in user: ${_user.email}`);
      _user.token = _token;
      _res.status(HttpStatusCodes.OK).json(_user);
    } catch (_error: any) {
      console.error('Login Error::::', _error);
      _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

router.post(
  '/signup',
  async (_req: Request<any, any, ISignupCredentials>, _res: Response) => {
    const _credentials: ISignupCredentials = _req.body;
    if (
      !(
        _credentials.email &&
        _credentials.password &&
        _credentials.firstName &&
        _credentials.lastName
      )
    ) {
      return _res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send('All Inputs Required');
    }

    try {
      const _existingUser: IUser = await UserModel.findOne({
        email: _credentials.email,
      });
      if (_existingUser) {
        return _res
          .status(HttpStatusCodes.CONFLICT)
          .send('Email Already Exists');
      }

      const _encryptedPassword: string = await bcrypt.hash(
        _credentials.password,
        10
      );
      const _newUser = await UserModel.create({
        firstName: _credentials.firstName,
        lastName: _credentials.lastName,
        email: _credentials.email,
        password: _encryptedPassword,
      });

      const _token = jwt.sign(
        {
          userId: _newUser._id,
          email: _newUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );
      console.log(`Successfully registered user: ${_newUser.email}`);
      _newUser.token = _token;
      _res.status(HttpStatusCodes.OK).json(_newUser);
    } catch (_error: any) {
      console.error('Sign Up Error::::', _error);
      _res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const authController = router;
