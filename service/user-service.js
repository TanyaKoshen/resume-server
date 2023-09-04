const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
  async register(email, password) {
    const userExist = await userModel.findOne({email});
    if (userExist) {
      throw ApiError.BadRequest(`user with email ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuid.v4();
    const user = await userModel.create({email, password: hashPassword, activationLink});
    //await mailService.sendActivationEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    const user = await userModel.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('incorrect activation link')
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('email not registered')
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest('wrong password')
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken){
    if (!refreshToken){
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if(!tokenDB || !userData){
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async getAllUsers(){
    const users = await userModel.find();
    return users;
  }
}

module.exports = new UserService();
