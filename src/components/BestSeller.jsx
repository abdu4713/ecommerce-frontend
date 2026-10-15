import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {


const{products} = useContext(ShopContext);
const [bestseller,setBestSeller] = useState([]);

useEffect(()=>{
const bestproduct =products.filter((item) =>(item.bestseller))
setBestSeller(bestproduct.slice(0,5))
},[])

  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title text1={'Best'} text2={'Sellers'} />
            <p className="w-3/4 m-auto text-xs md:text-base trxt-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum amet, ab commodi sunt veritatis enim quisquam veniam aliquam nemo, praesentium, odio possimus itaque eum eos quos est asperiores maiores placeat.
            </p>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
            bestseller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
