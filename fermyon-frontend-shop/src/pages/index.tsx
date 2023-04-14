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



const HomePage: NextPage<HomePageProps> = ({ products }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div key="1" className="border border-gray-200 p-4 rounded">
            <div className="w-full h-64 relative mb-4">
              <Image
                src="https://images.unsplash.com/photo-1611831928379-8b2b0b2b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Test 1</h2>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
