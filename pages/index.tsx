import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type Data = {
  responseTime: number;
  apiUsed: string;
  products: Product[];
}

type Product = {
  id: number;
  name: string;
  image_url: string;
  category_id: number;
};

type HomePageProps = {
  data: Data;
};

const HomePage = ({ data }: HomePageProps) => (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Products - {data.responseTime} ms</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <br/>
      <h3 className="text-xl font-bold mb-8 text-center"> {data.apiUsed}</h3>
    </div>
  );

export const getServerSideProps : GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
 
  const { query } = context;

  // Access query parameters
  const endpoint = query.endpoint;

  // Fetch data from another API with the query parameters
  const data = await fetchData(endpoint as string);

  return {
    props: {
      data,
    },
  };
};

async function fetchData(endointParam: string) {
  const response = await fetch(`${process.env.HOST}/api/wasm-api?endpoint=${encodeURIComponent(endointParam)}`)
  const data = await response.json(); 

  return data;
}

export default HomePage;
