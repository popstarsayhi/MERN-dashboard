import User from "../models/User";
import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import AffiliateStat from "../models/AffiliateStat";
import mongoose from "mongoose";

export const getAdmins = async (eq: Request, res: Response) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

export const getUserPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    //simlilar to sql left join
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ])


    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map(
        (id: mongoose.Types.ObjectId) => {
          return Transaction.findById(id);
        }
      )
    )


    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    )

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions })
      
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};
