import { Schema, model, connect } from 'mongoose';

type dateData = {
  month: string,
  totalSales: number,
  totalUnits: number,
}

interface IProductStat{
  productId: string,
  yearlySalesTotal: number,
  yearlyTotalSoldUnits: number,
  year: number,
  monthlyData: Array<dateData>,
  dailyData: Array<dateData>,
}

const ProductStatSchema = new Schema <IProductStat>(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = model<IProductStat>("ProductStat", ProductStatSchema);
export default ProductStat;