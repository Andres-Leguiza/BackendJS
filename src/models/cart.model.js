import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new Schema(
    {
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: { type: Number, default: 0 },
            _id: false
        }],
        default: []
    },
    {
        timestamps: true,
    }
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const CartModel = model("carts", schema);