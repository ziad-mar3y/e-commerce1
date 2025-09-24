'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components';

type Address = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

const Adressess: Address[] = [
  {
    id: 1,
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    phone: '+1 555 123 4567',
  },
  {
    id: 2,
    name: 'Jane Smith',
    street: '456 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'USA',
    phone: '+1 555 765 4321',
  },
];

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>(Adressess);

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this address?');
    if (confirmed) {
      setAddresses(prev => prev.filter(address => address.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Addresses</h1>
        <Button className='hover:bg-white hover:text-black hover:border-2'>
          <Link
          href=""
          className=""
        >
          + Add Address
        </Link>
        </Button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-600">You have no saved addresses.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map(address => (
            <div
              key={address.id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{address.name}</h2>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
              <p className="text-sm text-gray-500 mt-1">Phone: {address.phone}</p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/account/addresses/edit/${address.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}







// 'use client'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// type Address = {
//   name: string;
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
//   phone: string;
// };

// export default function EditAddressPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [address, setAddress] = useState<Address>({
//     name: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     phone: '',
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     // Fetch address data
//     const fetchAddress = async () => {
//       try {
//         const res = await fetch(`/api/user/addresses/${id}`);
//         const data = await res.json();
//         setAddress(data);
//       } catch (err) {
//         console.error('Failed to load address', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddress();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch(`/api/user/addresses/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(address),
//     });

//     if (res.ok) {
//       alert('Address updated!');
//       router.push('/account/addresses');
//     } else {
//       alert('Error updating address');
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Edit Address</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input label="Name" name="name" value={address.name} onChange={handleChange} />
//         <Input label="Street" name="street" value={address.street} onChange={handleChange} />
//         <Input label="City" name="city" value={address.city} onChange={handleChange} />
//         <Input label="State" name="state" value={address.state} onChange={handleChange} />
//         <Input label="Zip" name="zip" value={address.zip} onChange={handleChange} />
//         <Input label="Country" name="country" value={address.country} onChange={handleChange} />
//         <Input label="Phone" name="phone" value={address.phone} onChange={handleChange} />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// // 👇 Reusable Input component
// function Input({
//   label,
//   name,
//   value,
//   onChange,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
//         {label}
//       </label>
//       <input
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full border border-gray-300 rounded px-3 py-2"
//         required
//       />
//     </div>
//   );
// }