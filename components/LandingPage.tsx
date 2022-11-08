import Image from 'next/image'
import React from 'react'
import Button from './Button'

export default function LandingPage() {
    return (
        <section className='sticky top-0 mx-auto flex h-screen lg:max-w-[1150px]  max-w-[1350px] items-center'>
            <div className='space-y-8'>
                <h1 className=' tracking-wide text-5xl md:text-6xl lg:text-7xl space-y-3 font-semibold'>
                    <span className='block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>Powered</span>
                    <span className='block'>By Intellect</span>
                    <span className='block'>Driven By Values</span>
                </h1>
                <div className='flex gap-x-5 items-center '>
                    <Button title='Buy Now' handleChange={()=>{}}  />
                    <a className='link'>Learn more</a>
                </div>
            </div>
            <div className='relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[650px]'>
                <Image alt='iphone' src={'/iphone.png'} layout='fill' />
            </div>
        </section>
    )
}
