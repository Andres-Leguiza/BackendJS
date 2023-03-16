import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubUser: { type: Boolean, default: false },
    age: { type: Number, min: 0, required: true },
    password: { type: String, required: true, minLength: 6},
    role: { type: String, default: "user" }
  },
  {
    timestamps: true,
  },
);

export const UserModel = model("Users", schema);