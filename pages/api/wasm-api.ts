import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

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

async function fetchProducts(apiUrl: string) {
  const productFetch = await fetch(apiUrl);
  const data = await productFetch.json();
  console.log(data);

  const productsArray = Object.values(data as Record<string, Product>); // Convert the data object to an array with a type assertion
  return productsArray;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const endpoint  = req.query.endpoint;

  let apiUrl = `${process.env.WASM_API_URL}`;

  if (endpoint === 'azure') {
    apiUrl = `${process.env.AZURE_API_URL}`;
  }

  console.log('****apiUrl ' + apiUrl);

  const startTime = Date.now();
  const productsArray = await fetchProducts(apiUrl);
  const endTime = Date.now();
  const elapsedTime = endTime - startTime;

  console.log('responded in ' + elapsedTime);

  const data : Data = {
    responseTime: elapsedTime, 
    apiUsed: apiUrl,
    products: productsArray,
  };

  console.log('**data ' + data.responseTime)

  res.status(200).send(data); 
}
