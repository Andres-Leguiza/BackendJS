import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        status: { type: Boolean, default: true },
        category: { type: String, required: true },
        thumbnails: [String],
        code: { type: String, unique: true, required: true },
        stock: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
);

schema.plugin(mongooseDelete, { deletedAt: true });
schema.plugin(mongoosePaginate);

export const ProductModel = model("products", schema);