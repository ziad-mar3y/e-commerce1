'use client'
import { Brand } from '@/interfaces';
import { apiServices } from '@/services/api';
import { BrandsResponse } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function brands() {

  const [brands , setBrands]= useState <Brand[]>([])

  async function getBrands() {
    const data : BrandsResponse = await apiServices.getBrands()

    setBrands(data.data)    
  }
  useEffect(()=>{
    getBrands()
  },[])


  return (
<section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Brand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map(brand => (
            <div
              key={brand._id}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
