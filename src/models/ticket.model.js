import { Schema, model } from "mongoose";
import crypto from "crypto";

const schema = new Schema(
    {
        code: { type: String, unique: true },
        puchase_date: { type: Date, required: true, default: Date.now() },
        amount: { type: Number, required: true },
        purchaser: { type: String, required: true }
    },
    {
        timestamps: true
    },
);

schema.pre('save', function (next) {
    if (!this.code) {
      this.code = crypto.randomBytes(4).toString('hex');
    }
    next();
  });

export const TicketModel = model("Tickets", schema);