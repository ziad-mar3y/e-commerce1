// 'use client'
// import { apiServices } from '@/services/api'
// import { useParams } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image';

// export default function categoryDetailsPage() {
//     const [category, setCategory] = useState();
//     const { id } = useParams();
    

//     async function getSingleCategory() {

//         if (!(id instanceof Array)) {
//             const data = await apiServices.specificCategory(
//                 id ?? '');
//             console.log(data.data);

//             setCategory(data.data);
//         } else {
//             id[0]
//         }
//     }


//     useEffect(() => {
//         getSingleCategory()
//     }, [])






//     return (
//         <>
//             <div className="container flex flex-col   ">

//                 <h1 className=' '>specidic category</h1>
//                 <div className="  border-4 text-center">
//                     <h1>{category!.name}</h1>
//                     <div className=' mx-auto w-2xl p-2'>
//                         <Image

//                             src={category.image}
//                             alt={category.name}
//                             fill
//                             className=""
//                             sizes="5000px"
//                         />
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }
