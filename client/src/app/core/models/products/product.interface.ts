export interface IProduct {
  name: string;
  blurb: string;
  description: string;
  coverImage: string;
  images: string[];
  price: number;
  route?: string;
  _id?: string;
}
