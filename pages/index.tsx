import axios from 'axios';
import Image from 'next/image';
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

const HomePage = ({ products }: HomePageProps) => (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

export const getServerSideProps : GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.API_URL}`);
  const products = res.data;

  return {
    props: {
      products,
    },
  };
};

export default HomePage;
