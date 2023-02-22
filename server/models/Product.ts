import { Schema, model, connect } from 'mongoose';

interface MongoResult {
  _doc: any
}

interface IProduct extends MongoResult  {
  name:string
  price:string
  description: string
  category: string
  rating: number
  supply: number
}


const ProductSchema = new Schema<IProduct> (
    {
      name: String,
      price: Number,
      description: String,
      category: String,
      rating: Number,
      supply: Number,
    },
    { timestamps: true }
  );
  
  const Product = model<IProduct>("Product", ProductSchema);
  export default Product;