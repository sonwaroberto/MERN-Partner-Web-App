import { RequestHandler } from 'express'
import SignUpBody from '../interfaces'
import createHttpError from 'http-errors'
import UserModel from '../models/user'
import bcrypt from 'bcrypt'

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select('+email')
      .exec()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(
        400,
        "Parameter 'username' or 'email' 'password' must be provided"
      )
    }
    const existingUsername = await UserModel.findOne({
      username: username,
      email: email,
    }).exec()
    if (existingUsername) {
      throw createHttpError(
        409,
        'username already in use, please choose a new one'
      )
    }
    const existingEmail = await UserModel.findOne({ email: email }).exec()
    if (existingEmail) {
      throw createHttpError(409, 'email already in use, please login instead')
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10)
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    })
    req.session.userId = newUser._id
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
}
interface LoginBody {
  username?: string
  password?: string
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const user = await UserModel.findOne({ username: username })
      .select('+password + email + username')
      .exec()
    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }
    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.sendStatus(200)
    }
  })
}
