'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '@/app/database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AddProduct from './addproduct';
type Merchant = Database['public']['Tables']['merchants']['Row']
type Product = Database['public']['Tables']['products']['Row']

export default function merchantview({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Merchant>();
    const productget = createClientComponentClient<Product[]>()
    const [merchantData, setMerchantData] = useState<Merchant>();
    const [products, setProducts] = useState<Product[]>([])
    const user = session?.user;

    if(user){
    useEffect(() => {
        const fetchData = async () => {
            const  merchant : Merchant | any = await supabase.from('merchants').select('*').eq('created_by_userid', user?.id);
            setMerchantData(merchant.data[0]);
            console.log(merchantData);
        }
        fetchData();    
    }, [])

          const fetchProducts =async () => {
          const product: Product[] | any = await productget.from('products').select('*').eq('merchant_id', merchantData?.id);
          setProducts(product.data);
          console.log(products);
        }
        fetchProducts();

  return merchantData && products ?(
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="bg-white p-6 shadow-lg rounded-md">
        <div className="flex items-center justify-center">
          <img
            src={merchantData.BannerUrl || '/default-avatar.png'} // Provide a default avatar image path
            alt={`${merchantData.name}'s Avatar`}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-3xl font-semibold">@{merchantData.name || 'No Name'}</h2>
        </div>
        <div className="mt-6">
          <p className="text-gray-700">{merchantData.About}</p>
        </div>
        <div className="mt-6">
          <p>{merchantData.is_active ? 'Active' : 'Inactive'}</p>
          <p>{merchantData.is_blocked ? 'Blocked' : 'Not Blocked'}</p>
        </div>
        <div>
          <h1>Products</h1>
          <ul>
            {products.map((product) => (
              <li>
                <h1>{product.Name}</h1>
                <p>{product.Description}</p>
              </li>
            ))}
          </ul>
        </div>
        <AddProduct 
            params={merchantData.id}
        />
        <div className="mt-6">
          <p>Last Updated: {merchantData.updated_at || 'N/A'}</p>
        </div>
      </div>
    </div>
  ): (<>error loading data</>);
    }
  }
