import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const schema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        status: { type: Boolean, default: true },
        thumbnails: [String],
        code: { type: String, unique: true, required: true },
        stock: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

schema.plugin(mongooseDelete, { deletedAt: true });

export const ProductModel = mongoose.model("products", schema);