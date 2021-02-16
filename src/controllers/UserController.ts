import express from "express";
import Bcrypt from "bcryptjs";

import User, { UserDoc, PublicUserInfo, Role } from "../models/User";

type SpecificUserParams = {
  id: string;
};

type UserInfoWithJwtToken = {
  id: string;
  name: string;
  role: Role;
  token: string;
};

type AddUserBody = {
  name: string;
  password: string;
  role: Role;
};

type UpdateUserBody = {
  name?: string;
  password?: string;
  role?: Role;
};

type GetUserTokenBody = {
  password: string;
};

// GET /api/users
export const findAll = async (
  _: express.Request<void>,
  res: express.Response<UserDoc[]>,
  next: express.NextFunction
): Promise<express.Response<UserDoc[]> | void> => {
  try {
    const users = await User.find({}).exec();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
};

// POST /api/users
export const addOne = async (
  req: express.Request<void, UserDoc, AddUserBody>,
  res: express.Response<UserDoc>,
  next: express.NextFunction
): Promise<express.Response<UserDoc> | void> => {
  const reqBody = req.body;
  reqBody.password = Bcrypt.hashSync(reqBody.password);

  try {
    const newUser = await User.create({
      ...reqBody,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

// FIXME: Mongoose の toJSON() のせいで Response に設定した型と実際に返ってくる型に違いが生じている
// 案: 関数内で型変換を行なってから返却する
// GET /api/users/:id
export const findOne = async (
  req: express.Request<SpecificUserParams>,
  res: express.Response<PublicUserInfo>,
  next: express.NextFunction
): Promise<express.Response<PublicUserInfo> | void> => {
  const userId = req.params.id;
  try {
    const targetUser = await User.findById(userId);
    if (targetUser == null) {
      // Not found
      return res.status(404).json();
    } else {
      return res.json(targetUser.toJSON());
    }
  } catch (err) {
    return next(err);
  }
};

// GET /api/user/:id/tokens
export const getToken = async (
  req: express.Request<
    SpecificUserParams,
    UserInfoWithJwtToken,
    GetUserTokenBody
  >,
  res: express.Response<UserInfoWithJwtToken>,
  next: express.NextFunction
): Promise<express.Response<UserInfoWithJwtToken> | void> => {
  const userId = req.params.id;
  const reqBody = req.body;

  try {
    const user = await User.findById(userId);
    if (user == null) {
      // NotFound
      return res.status(404).json();
    }
    // FIXME: パスワードのチェックをモデルに投げたい
    if (!Bcrypt.compareSync(reqBody.password, user.password)) {
      // Incorrect Password
      return res.status(401).json();
    }
    const userInfoWithToken: UserInfoWithJwtToken = {
      id: user._id,
      name: user.name,
      role: user.role,
      token: "token",
    };

    return res.json(userInfoWithToken);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id
export const updateOne = async (
  req: express.Request<SpecificUserParams, UserDoc, UpdateUserBody>,
  res: express.Response<UserDoc>,
  next: express.NextFunction
): Promise<express.Response<UserDoc> | void> => {
  const userId = req.params.id;
  const reqBody = req.body;

  if (reqBody.password != undefined) {
    reqBody.password = Bcrypt.hashSync(reqBody.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: reqBody },
      { new: true }
    );
    if (updatedUser == null) {
      // Not found
      res.status(404).json();
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id
export const deleteOne = async (
  req: express.Request<SpecificUserParams>,
  res: express.Response<void>,
  next: express.NextFunction
): Promise<express.Response<void> | void> => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    return res.json();
  } catch (err) {
    return next(err);
  }
};

// export default { findAll, findOne, addOne, updateOne, deleteOne };
