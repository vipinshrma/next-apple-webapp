import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button';
import CheckoutProduct from '../components/CheckoutProduct';
import { selectBasketItems, selectBasketTotal } from '../redux/baseketSlice';
import { useRouter } from 'next/router'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe'
import { fetchPostJSON } from '../utils/apiHelpers';
import getStripe from '../utils/getStripejs';
export default function Checkout() {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [groupedItemsBasket, setGroupItem] = useState({} as { [key: string]: Product[] })

    useEffect(() => {
        const groupedItems = items?.reduce((results, item) => {
            (results[item._id] = results[item._id] || []).push(item);
            return results
        }, {} as { [key: string]: Product[] })

        setGroupItem(groupedItems)

    }, [items])

    const createCheckoutSession = async () => {
        setLoading(true)
        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON('/api/checkout_session', { items });

        //internal server error
        if ((checkoutSession as any).statusCode === 500) {
            console.error("error==>", (checkoutSession as any).message)
            setLoading(false)
            return;
        }
        // Redirect to checkout
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout({
            sessionId: checkoutSession.id
        })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message);
        setLoading(false)

    }



    return (
        <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
            <Head>
                <title>Bag - Apple</title>
                {/* <link rel='' > */}
            </Head>
            <main className='mx-auto max-w-5xl pb-24'>
                <div className='px-5'>
                    <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
                        {items.length > 0 ? "Review Your Bag" : "Your bag is empty"}
                    </h1>
                    <p>Free delivery and free returns</p>
                    {
                        items.length === 0 && (
                            <Button title='Continue Shopping' handleChange={() => router.push('/')} />
                        )
                    }
                </div>
                {
                    items?.length > 0 && (
                        <div className='mx-5 md:mx-8'>
                            {
                                Object.entries(groupedItemsBasket).map(([key, items]) => {
                                    return <CheckoutProduct key={key} id={key} items={items} />
                                })
                            }
                            <div className='my-12 mt-6 ml-auto max-w-3xl'>
                                <div className='divide-y divide-gray-300'>
                                    <div className='pb-4'>
                                        <div className='flex justify-between'>
                                            <p>Subtotal</p>
                                            <p>${basketTotal}</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p>Shipping</p>
                                            <p>Free</p>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='flex flex-col gap-x-1 lg:flex-row'>
                                                Esitmated time for:{""}
                                                <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                                                    Enter zip code
                                                    <ChevronDownIcon className='h-6 w-6' />
                                                </p>
                                            </div>
                                            <p>$ - </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between pt-4 text-xl font-semibold'>
                                        <h4>Total</h4>
                                        <h4>${basketTotal}</h4>
                                    </div>
                                </div>
                                <div className='my-14 space-y-4'>
                                    <h4 className='text-xl font-semibold'>How would you like to check out ?</h4>
                                    <div className='flex flex-col gap-4 md:flex-row'>
                                        <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
                                            <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                                                <span>Pay Monthly</span>
                                                <span>with Apple Card</span>
                                                <span>
                                                    $283.16/mo. at 0% APR<sup className='-top-1'></sup>
                                                </span>
                                            </h4>
                                            <Button handleChange={() => router.push('/')} title='Check Out with Apple Card  Monthly Installments' />
                                            <p className='mt-2 max-w-[240px] text-[13px]'>
                                                $0.00 due today , which includes applicable full-price items,down payments ,shipping ,and taxes.
                                            </p>
                                        </div>
                                        <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
                                            <h4 className='mb-4 flex flex-col text-xl font-semibold'>
                                                Pay in full
                                                <span>
                                                    ${basketTotal}
                                                </span>
                                            </h4>
                                            <Button
                                                noIcon
                                                title='Checkout'
                                                width='w-full'
                                                handleChange={createCheckoutSession}
                                                loading={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </main>


        </div>
    )
}
