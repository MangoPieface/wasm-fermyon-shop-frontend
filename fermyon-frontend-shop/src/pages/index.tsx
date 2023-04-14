import axios from 'axios';
import Image from "next/legacy/image";
import { GetServerSideProps, NextPage } from 'next';

type Product = {
  id: number;
  name: string;
  image_url: string;
  category_id: number;
};

type HomePageProps = {
  products: Product[];
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const res = await axios.get('https://spin-http-js-oz6sxnhe.fermyon.app/api/products');
  const products = res.data;

  return {
    props: {
      products,
    },
  };
};



const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
          <div key={product.id} className="border border-gray-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
