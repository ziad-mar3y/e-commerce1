"use client"

import { useForm } from "react-hook-form"
import { json, z } from "zod"
import {signIn} from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export default function ProfileForm() {
  const form = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/products"

  async function onSubmit(values:any){
    try {
         const response = await signIn("credentials" , {
        email:values.email,
        password : values.password,
        redirect : false,
    })
    if (response?.ok) {
        router.push(callbackUrl)
    }
        
    } catch (error) {
        alert(JSON.stringify(error))
    }
  
    
  }

  return (
  <div className=" max-w-2xl mx-auto my-12">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your email" type="email" {...field} />
              </FormControl>
          
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
          
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div>
  )
}