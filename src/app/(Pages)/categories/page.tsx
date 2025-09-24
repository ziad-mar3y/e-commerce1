'use client'
import { Category } from '@/interfaces';
import { apiServices } from '@/services/api';
import { CategoriesResponse } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


export default function categories() {
  const [categores, setCategores] = useState<Category[]>()

  async function getaLLCategories() {

    const data: CategoriesResponse = await apiServices.getCategories()

    setCategores(data.data);


  }
  useEffect(() => {
    getaLLCategories()
  }, [])


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categores?.map((category) => (
            <Link

              key={category._id}
              href={`/categories/${category._id}`}
              className="group relative block overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <Image
                width={500}
                height={500}
                src={category.image!}
                alt={category.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg font-semibold">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
