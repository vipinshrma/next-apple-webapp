import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { urlFor } from '../sanity'
import {useDispatch} from 'react-redux'
import { addToBasket } from '../redux/baseketSlice'
import {toast} from 'react-hot-toast'

interface Props{
  product:Product,
}

export default function ProductCard({product}:Props) {
  const dispatch = useDispatch()
  const addItemToBasket = ()=>{
    dispatch(addToBasket(product))
    toast.success(`${product.title} added to basket`,{position:'bottom-right'})

  }
  return (
    <div className='flex h-fit w-[320px] selected-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10'>
       <div className='relative w-full h-64 md:h-72'>
       <Image alt='cardImg'  src={urlFor(product.image[0]).url()} width={256} height={256} />
       </div>
        <div   className='flex flex-1 items-center justify-between space-x-3'>
            <div className='space-y-2 text-xl text-white md:text-2xl'>
                {/* <p className='text-gray-400 text-xs'>Laptop</p> */}
                <p>{product.title}</p>
                <p>$ {product.price}</p>
            </div>
            <div onClick={addItemToBasket} className='group flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]'>
                <ShoppingCartIcon className='h-8 w-8 text-white group-hover:animate-none animate-bounce duration-200 ease-in-out'/>
            </div>
        </div>
    </div>
  )
}
