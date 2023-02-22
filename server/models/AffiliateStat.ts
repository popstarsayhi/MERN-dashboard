import { Schema, model, connect, Types} from 'mongoose';

interface IAff{
  userId:{
    type:Types.ObjectId,
  }
  affiliateSales: {
    type: [Types.ObjectId],
  },
}

const AffiliateStatSchema = new Schema<IAff>(
    {
      userId: { type: Types.ObjectId, ref: "User" },
      affiliateSales: {
        type: [Types.ObjectId],
        ref: "Transaction",
      },
    },
    { timestamps: true }
  );
  
  const AffiliateStat = model<IAff>("AffiliateStat", AffiliateStatSchema);
  export default AffiliateStat;