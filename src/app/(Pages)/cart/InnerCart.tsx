'use client'
import { Button } from '@/components'
import CartComponent from '@/components/products/cartComponent'
import { cartContext } from '@/Context/CartContext'
import { formatPrice } from '@/helpers/currency'
import { GetCartResponse } from '@/interfaces'
import { apiServices } from '@/services/api'
import { Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface InnerCartProps {
    cartData: GetCartResponse
}

export default function InnerCart({ cartData }: InnerCartProps) {

    const [innerCartData, setInnerCartData] = useState<GetCartResponse>(cartData)

    const [isCartRemoving, setIsCartRemoving] = useState(false)

    const { setCartCount } = useContext(cartContext);

    const [checkoutLoading, setCheckoutLoading] = useState(false)

    useEffect(() => {
        setCartCount!(innerCartData.numOfCartItems);
    }, [innerCartData])


    async function deleteCartProduct(productId: string, setIsDeleting: (value: boolean) => void) {
        setIsDeleting(true)
        const data = await apiServices.deleteProductFromCart(productId)
        toast.success("product deleting successfully", {
            position: 'bottom-right'
        });
        setIsDeleting(false)
        const newCartData = await apiServices.getUserCart();
        setInnerCartData(newCartData)

    }


    async function handleRemoveCart() {
        setIsCartRemoving(true)
        const response = await apiServices.deleteUserCart();
        setIsCartRemoving(false)
        const newCartData = await apiServices.getUserCart();
        setInnerCartData(newCartData)

    }

    async function handleCheckout() {
        setCheckoutLoading(true)
        const response = await apiServices.checkout(cartData.cartId)
        setCheckoutLoading(false)
        location.href = response.session.url

    }


    return (
        <>
            <div className="mb-8">
                <h1 className='text-3xl font-bold mb-4'>Shopping Cart</h1>
                {innerCartData.numOfCartItems > 0 && <p className=' text-muted-foreground'>
                    {innerCartData.numOfCartItems} item
                    {innerCartData.numOfCartItems !== 1 ? "s" : ""} in your cart
                </p>}
            </div>
            {innerCartData.numOfCartItems > 0 ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        {/* Cart Items */}
                        <section className="flex-1 bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                            {innerCartData.data.products.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {innerCartData.data.products.map((item) => (
                                        <CartComponent key={item._id} deleteCartProduct={deleteCartProduct} item={item} />
                                    ))}

                                </ul>
                            )}

                        </section>



                    </main>
                    <div className='mt-4'>
                        <Button disabled={isCartRemoving}
                            onClick={handleRemoveCart}
                            variant={'outline'}>
                            {isCartRemoving ? <Loader2 className='animate-spin' /> : <Trash2 className='h-4 w-4 mr-2' />}clear cart</Button>
                    </div>
                </div>


                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-20 ">
                        <h3 className=' text-lg font-semibold mb-4'>order sammary</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span> Subtotal ({innerCartData.numOfCartItems}items)</span>
                                <span> formatPrice ({innerCartData.data.totalCartPrice})</span>
                            </div>
                            <div className="flex justify-between">
                                <span>shipping</span>
                                <span className='text-green-600'>free</span>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className="flex justify-between font-semibold text-lg mb-6">
                            <span>Total</span>
                            <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                        </div>
                        <Button className='w-full size-lg' asChild>procced to checkout</Button>
                        <Button disabled={checkoutLoading} onClick={handleCheckout} variant={'outline'} className='w-full mt-2 bg-black text-white hover:bg-white hover:text-black'>
                            {checkoutLoading && <Loader2 className='animate-spin' />}
                            Procced fo checkOut

                        </Button>
                        <Button variant={'outline'} className='w-full mt-2'>
                            <Link href={"/products"}>
                                Continue shopping
                            </Link>
                        </Button>
                        <Button variant={'outline'} className='w-full mt-2'>
                            <Link href={"/adresses"}>
                                Adresses
                            </Link>
                        </Button>

                    </div>
                </div>
                :


            </div>
                :
                (
                    <div className='text-center'>
                        <h2 className='text-xl font-semibold mb-4 text-gray-700'> no product in your cart</h2>
                        <div className='mt-4'>
                            <Button variant={'outline'}><Link href={"/products"}> Add products</Link></Button>
                        </div>

                    </div>
                )
            }
        </>
    )
}
