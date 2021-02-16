import mongoose, { Document, Model, Schema } from "mongoose";
import Bcrypt from "bcryptjs";

export type Role = "admin" | "member" | "watcher";

export interface UserDoc extends Document {
  name: string;
  password: string;
  role: Role;
}

export type PublicUserInfo = {
  id: string;
  name: string;
  role: Role;
};

const userSchema: Schema<UserDoc> = new Schema<UserDoc>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member", "watcher"],
    required: true,
  },
});

userSchema.set("toJSON", {
  minimize: true,
  transform: function (_: any, user: UserDoc): PublicUserInfo {
    // 余計な情報を外部に出さないために整形する
    const returnUserInfo: PublicUserInfo = {
      id: user._id,
      name: user.name,
      role: user.role,
    };
    return returnUserInfo;
  },
  versionKey: false,
});

type UserModel = Model<UserDoc>;

export default mongoose.model<UserDoc, UserModel>("User", userSchema);
