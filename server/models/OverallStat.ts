import { Schema, model, connect } from 'mongoose';

interface Type {
  date: string;
  month: string;
  totalSales: number;
  totalUnits: number;
}

interface IOverallStat {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: Array<Type>;
  dailyData: Array<Type>;
  salesByCategory: any
}

const OverallStatSchema = new Schema(
  {
    totalCustomers: Number,
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
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = model<IOverallStat>("OverallStat", OverallStatSchema);
export default OverallStat;
