import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubUser: { type: Boolean, default: false },
    age: { type: Number, min: 0, required: true },
    password: { type: String, required: true, minLength: 6},
    role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
    documents: [{ name: String, reference: String }],
    last_connection: { type: Date, default: Date.now() }
  },
  {
    timestamps: true,
  },
);

schema.plugin(mongooseDelete, { deletedAt: true });
export const UserModel = model("Users", schema);