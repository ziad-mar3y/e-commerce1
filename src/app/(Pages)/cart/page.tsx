import { apiServices } from '@/services/api'
import React from 'react'
import InnerCart from './InnerCart'

export default async function cart() {


  async function getCart() {
    const data = await apiServices.getUserCart()
    return data
  }

  const response = await getCart()
  

  return (

    <div className="container mx-auto px-4 py-8">
   <InnerCart key={response.data._id} cartData={response}/>
    </div>


  )
}







