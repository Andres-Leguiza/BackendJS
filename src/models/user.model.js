import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import { createCart } from "../services/cartDAOs/cart.service.js"

const schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    githubUser: { type: Boolean, default: false },
    age: { type: Number, min: 0, required: true },
    password: { type: String, required: true, minLength: 6},
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
    role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
    documents: [{ name: String, reference: String }],
    last_connection: { type: Date, default: Date.now() }
  },
  {
    timestamps: true,
  },
);

schema.pre('save', async function (next) {
  const newCart = await createCart({});
  this.cart = newCart._doc._id;
  next();
});

schema.plugin(mongooseDelete, { deletedAt: true });
export const UserModel = model("Users", schema);