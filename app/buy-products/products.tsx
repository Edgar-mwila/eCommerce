'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '../database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
type Product = Database['public']['Tables']['products']['Row']

export default function Products() {
    const supabase = createClientComponentClient<Product[]>();
    const [product, setProduct] = useState<Product[] | any>();

    useEffect(() => {
      const fetchProducts =async () => {
        const {data: product, error} = await supabase.from('products').select('*');
        if(!error) setProduct(product);
        if(error) console.log('error: ', error);
      }  
      fetchProducts(); 
    }, [])

    
  return product ?(

    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      {product.map((prod: { id: React.Key | null | undefined; Name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; Price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) => (
        <Link
          key={prod.id}
          href={'/buy-products/' + prod.id}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
          >
            <p>{prod.Name}</p>
            <p>K{prod.Price}</p>
        </Link>
      ))}
    </div>
  ): (<span>error loading data</span>)
}
