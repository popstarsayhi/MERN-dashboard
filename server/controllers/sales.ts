import OverallStat from "../models/OverallStat";
import {Request, Response} from "express";

export const getSales = async (eq: Request, res: Response) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0])

  } catch (err) {
    res.status(404).json({ message: (err as Error).message })
  }
}