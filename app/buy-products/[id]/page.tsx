'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/database.types";
import Link from "next/link";
import { useEffect, useState } from "react";
type Product = Database['public']['Tables']['products']['Row']
type Display = Database['public']['Tables']['product_display']['Row']

export default function Item({ params }: { params: { id: number } }) {
  const supabase = createClientComponentClient<Product>();
  const display = createClientComponentClient<Display>();
  const [product, setProduct] = useState<Product | any>();
  const [displayDetails, setDisplayDetails] = useState<Display | any>();

  useEffect(() => {
    const fetchData = async () => {
      const { data: product, error} = await supabase.from('products').select('*').eq('id', params.id);
      setProduct(product)
    }
    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data: displayDetails, error } = await display.from('Product_display').select('*').eq('id', params.id);
      console.log(displayDetails);
      setDisplayDetails(displayDetails)
    }
    fetchData();
  }, [])

  console.log(displayDetails);
  if(product && displayDetails){
  return (
    <div key={params.id}>
      <h1 className="text-2xl text-underline">{product[0].Name}</h1>
      <img
            src={product[0].image_url || '/default-avatar.png'}
            alt={'image'}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
      <p>Original price :K{product[0].Price}</p>
      <p>discounted price :K{isNaN((product[0].Price - ((displayDetails.DiscountPercentage/100)*product[0].Price)))}</p>
      <br/>
      <p>{product[0].Description}</p>
      <hr/>
      <p>Items in stock: {displayDetails.stock}</p>
      <Link href={'/payment'}className="text-1xl text-gray"><button>Buy</button></Link>
    </div>
  )}
  else return <h1>an error occured</h1>

}