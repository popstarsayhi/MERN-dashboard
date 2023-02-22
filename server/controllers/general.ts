import User from "../models/User";
import { Request, Response } from "express";
import OverallStat from "../models/OverallStat";
import Transaction from "../models/Transaction";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: (err as Error).message });
  }
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDashboardStats = async (req: Request, res: Response) => {
  const { date } = req.params;

  const dateArr = date.split("-")

  const MM = monthNames[Number(dateArr[1])-1]

  try {
    const usedmonth = MM;
    const usedyear = dateArr[0];
    const usedday = date;

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: usedyear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === usedmonth;
    });

    const todayStats = overallStat[0].dailyData.find((item) => {
      return item.date === usedday;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: (err as Error).message });
  }
};
