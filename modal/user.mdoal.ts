import mongoose, { Schema } from "mongoose";

export type UserRole = "student" | "admin";

export interface UserDocument {
  _id: mongoose.Types.ObjectId;
  name: string;
  loginId: string;
  passwordHash: string;
  mobileNo: string;
  role: UserRole;
  isAuthorized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    loginId: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    mobileNo: { type: String, required: true, trim: true , }, // unique karna hai 
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    isAuthorized: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;