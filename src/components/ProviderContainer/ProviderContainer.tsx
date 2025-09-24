'use client';
import CartContextProcider from '@/Context/CartContext'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function ProviderContainer({
    children
}: {
    children: ReactNode
}) {
    return (
        <SessionProvider>
     <Provider store={store}>
            <CartContextProcider>
                {children}
            </CartContextProcider>
        </Provider>
        </SessionProvider>
   
    )
}
