import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import LandingPage from '../components/LandingPage'
import ProductCard from '../components/ProductCard'
import Basket from '../components/Basket'

import Tabs from '../components/Tabs'
import { fetchCategories } from '../utils/fetchCategories'
import { fetchProducts } from '../utils/fetchProducts'
import {getSession} from 'next-auth/react'
import type {Session} from 'next-auth'

interface Props{
  categories:Category[],
  products:Product[],
  session:Session | null
}

export default function Home({categories,products}:Props) {
  const showProducts = (category:number)=>{
    return products?.filter((product=>product.category._ref===categories[category]._id)).map((product=><ProductCard  key={product._id} product={product}/>))
  }
  return (
    <div>
     <Head >
      <title>Apple</title> 
     </Head>
     <Basket/>
     <main className='relative h-[200vh] bg-[#E7ECEE]'>
      <LandingPage/>
     </main>
     <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
      <div className='space-y-10 py-16'>
      <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>New Promos</h1>
      </div>
      <Tabs categories={categories}  showProduct={showProducts}/>
      <div>
        {/* <ProductCard p/> */}
      </div>
     </section>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps<Props> = async(context)=>{
  const categories = await fetchCategories();
  const products = await fetchProducts()
  const session = await getSession(context)
  return {
    props:{
      categories,
      products,
      session
    }
  }
}
