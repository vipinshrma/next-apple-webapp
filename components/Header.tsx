import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import {useSelector} from 'react-redux'
import { selectBasketItems } from '../redux/baseketSlice'
export default function Header() {
    const session = false;
    const items = useSelector(selectBasketItems);

    return (
        <header className='sticky top-0 z-30 flex justify-between items-center w-full bg-[#E7ECEE] p-4'>
            <div className='flex justify-center items-center md:w-1/5'>
                <Link href={'/'}>
                    <Image alt='logo' src={"http://rb.gy/vsvv2o"} height={40} width={20} className='cursor-pointer opacity-75 transition hover:opacity-100' />
                </Link>
            </div>
            <div className='hidden flex-1 items-center justify-center space-x-8 md:flex '>
                <a className='headerLink'>Product</a>
                <a className='headerLink'>Explore</a>
                <a className='headerLink'>Support</a>
                <a className='headerLink'>Business</a>
            </div>
            <div className='flex gap-x-4 items-center md:w-1/5'>
                <MagnifyingGlassIcon className='headerIcons' />
                <Link href={'/checkout'}>
                    <div className='relative cursor-pointer'>
                        <ShoppingBagIcon className='headerIcons' />
                        {
                            items?.length > 0 && <p className=' absolute -top-1 -right-1 text-xs flex items-center justify-center p-2 text-white bg-red-400 z-50 rounded-full text-[10px] h-4 w-4 bg-gradient-to-tr from-pink-500 to-violet-500'>{items?.length}</p>
                        }
                       
                    </div>
                </Link>
                {
                    session ? <Image src="https://i.pravatar.cc/150?img=8" alt='user' height={25} width={25} className='rounded-full cursor-pointer    ' /> : <UserIcon className='headerIcons' />
                }

            </div>
        </header>
    )
}
