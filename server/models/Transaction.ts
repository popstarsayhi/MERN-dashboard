import { Schema, model, connect, Types} from 'mongoose';
import mongoose from "mongoose";


interface ITransaction{
  userId:string
  cost:string
  products:{
    type:Types.ObjectId,
    of:number
  }
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: String,
    cost: String,
    products: {
      type: [Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;