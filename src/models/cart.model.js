import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
    {
        products: [{ product: String, quantity: { type: Number, default: 0 }, _id: false }]
    },
    {
        timestamps: true,
    }
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const CartModel = mongoose.model("carts", schema);