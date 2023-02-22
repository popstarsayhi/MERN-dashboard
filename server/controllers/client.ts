import Product from "../models/Product";
import ProductStat from "../models/ProductStat";
import Transaction from "../models/Transaction";
import User from "../models/User";
import {Request, Response} from "express";
import getCountryISO3 from "country-iso-2-to-3"
// const getCountryISO3 = require("country-iso-2-to-3");

export const getProducts = async (req: Request, res: Response) => {
    try {
        //get all products
        const products = await Product.find();

        const productWithStats = await Promise.all(
            products.map(async (product) => {
                //find every single product stat based on product id
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stat,
                };
            })
        );
        res.status(200).json(productWithStats);
    } catch (err) {
        res.status(404).json({message: (err as Error).message});
    }
};

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await User.find({role: "user"}).select("-password");
        res.status(200).json(customers);
    } catch (err) {
        res.status(404).json({message: (err as Error).message});
    }
};

/*
    @desc: server side pagination
 */

interface RequestQuery {
    page: number;
    pageSize: number;
    sort: string;
    search: string;
}

export const getTransactions = async (
    req: Request<{}, {}, {}, RequestQuery>,
    res: Response
) => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const {page, pageSize, sort, search} = req.query;

        // formatted sort should look like { userId: -1 }
        const generateSort = (): { [key: string]: any } => {
            let sortParsed = JSON.parse(sort);
            return {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                {cost: {$regex: new RegExp(search, "i")}},
                {userId: {$regex: new RegExp(search, "i")}},
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments();

        // const total = await Transaction.countDocuments({
        //     name: { $regex: search, $options: "i" },
        // })

        res.status(200).json({
            transactions,
            total,
        });
    } catch (err) {
        res.status(404).json({message: (err as Error).message});
    }
};

export const getGeography = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        //nivo choropleth
        /*[{
                "id":"",
                "value":""
            }] */
        const mappedLocations = users.reduce((acc, {country}) => {
            const countryISO3: string = getCountryISO3(country)
            const cnt = acc.get(countryISO3)
            if (cnt === undefined) {
                acc.set(countryISO3, 1)
            } else {
                acc.set(countryISO3, cnt+1)
            }
            return acc;
        }, new Map<string, number>());

        const formattedLocations = [...mappedLocations].map(
            ([country, count]) => {
                return {id: country, value: count};
            }
        )

        res.status(200).json(formattedLocations);
    } catch (err) {
        res.status(404).json({message: (err as Error).message});
    }
};
