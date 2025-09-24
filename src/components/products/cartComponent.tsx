'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui'
import { Loader2, Trash2 } from 'lucide-react'
import { CartProduct, InnerCartProduct } from '@/interfaces'

// const {count} = useSelector((state:any)=>state.counter)

// const dispatch = useDispatch<any>();


interface CartProductProps {
  item: CartProduct<InnerCartProduct>;
  deleteCartProduct: (
    ProductId: string,
    setInnerCartData :(value : boolean)=>void
      

  )=>void
}





export default function CartComponent({ item , deleteCartProduct }: CartProductProps) {

  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <li key={item._id} className="flex items-center py-4">
      <Image
        width={500}
        height={500}
        src={item.product.imageCover}
        alt={item.product.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <Link href={'/products/${item._id}'}>
          {item.product.title}
        </Link>
        <p className="text-gray-600">
          Quantity: {item.product.quantity}
        </p>
        <p className="text-gray-900 font-semibold mt-1">
          ${(item.price)}
        </p>
      </div>

      {/* Quantity controls (optional) */}
      <div className='gap-2 flex'>

        <Button  className="px-4 py-1 bg-gray-200 rounded-l text-black hover:text-white">-</Button>
        <span className='w-8 text-center'>{item.count}</span>
        {/* <span className='w-8 text-center'>{count}</span> */}
        <Button className="px-3 py-1 bg-gray-200 rounded-r text-black hover:text-white">+</Button>
        <Button onClick={()=> deleteCartProduct(item.product._id , setIsDeleting)} variant={'ghost'} size={"sm"}>
          {isDeleting ? <Loader2 className=' animate-spin' /> : <Trash2 className='h-4 w-4 ' />}
        </Button>
      </div>
    </li>
    
    
  )
}
