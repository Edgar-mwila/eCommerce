'use client'
import React, { useState } from 'react'
import { Database } from '@/app/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Avatar from './avatar';
type product = Database['public']['Tables']['products']['Row']

export default function AddProduct({params}: {params: number}) {
    const supabase = createClientComponentClient<product>();

    const merchantid = params;
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [productUrl, setProductUrl] = useState('')
    const [stock, setStock] = useState(1)
    const [discount, setDiscount] = useState(0)

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
            const { error } = await supabase.from('products').upsert({merchant_id: merchantid,
            Price: price,
            Description: description,
            Name: name,
            updated_at: new Date().toISOString(),
            image_url: productUrl,
            })
            if(!error){
            const { error } = await supabase.from('Product_display').upsert({
              id: merchantid,
              DiscountPercentage: discount,
              stock: stock
            })
        setDescription('')
        setName('')
        setProductUrl('')
        setPrice(0)
        setDiscount(0)
        setStock(1);
        if(error) alert('There was an error');
            }
        if(error) alert('There was an error');

    }
  return (
    <div>
      <form className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="Name"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="productPrice"
          name="Price"
          value={price}
          onChange={(e) => {setPrice(isNaN(parseFloat(e.target.value))? 0: parseFloat(e.target.value))}}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="productDescription"
          name="Description"
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <Avatar
        uid={merchantid}
        url={productUrl}
        size={150}
        onUpload={(url) => {
          setProductUrl(url);
        }}
      />
      <label> Discount (%)
      <input
          type="number"
          id="discount"
          name="discount"
          value={discount}
          onChange={(e) => {if(isNaN(parseFloat(e.target.value))? 0: parseFloat(e.target.value)<=100 && isNaN(parseFloat(e.target.value))? 0: parseFloat(e.target.value)>=0) setDiscount(isNaN(parseFloat(e.target.value))? 0: parseFloat(e.target.value));
            else setDiscount(0);
          }}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        </label>

      <label>Stock
      <input
          type="number"
          id="stock"
          name="stock"
          value={stock}
          onChange={(e) => {setStock(isNaN(parseFloat(e.target.value))? 0: parseFloat(e.target.value))}}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        </label>

      <div className="mt-4">
        <button
          onClick={(e) => onSubmit(e)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Product
        </button>
      </div>
    </form>
    </div>
  )
}
