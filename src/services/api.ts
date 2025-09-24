import { AddToCartResponse, GetCartResponse } from "@/interfaces";
import { BrandsResponse, CategoriesResponse, ProductsResponse, SingleProductResponse } from "@/types";




const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiServices {

    #baseUrl: string = "";

    constructor() {
        this.#baseUrl = baseUrl ?? "";
    }

    async getAllProducts(): Promise<ProductsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products"
        ).then((res) => res.json());
    }

    async getProductDetails(productId: string): Promise<SingleProductResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/products/" + productId
        ).then((res) => res.json())
    }

    async getBrands(): Promise<BrandsResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/brands"
        ).then((res) => res.json())
    }

    async getCategories(): Promise<CategoriesResponse> {
        return await fetch(
            this.#baseUrl + "api/v1/categories"
        ).then((res) => res.json())
    }

    #getHeaders() {
        return {
            "Content-Type": "application/json",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODY1YmQ2NDA5YTQ0MzA0MTkxNzU5NiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU4NjI5NTI1LCJleHAiOjE3NjY0MDU1MjV9.gWpXpUqkQ7LNJQ8HZkcCVyL-HNexHzuX2kFGTACKBwQ "
        }
    }

    async addProductToCart(productId: string): Promise<AddToCartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            method: "post",
            body: JSON.stringify({
                productId
            }),
            headers: this.#getHeaders()
        }).then((res) => res.json())
    }

    async getUserCart(): Promise<GetCartResponse> {
        return await fetch(this.#baseUrl + "api/v1/cart", {
            headers: this.#getHeaders()
        }).then((res) => res.json())

    }

    async deleteProductFromCart(productId: string): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/cart/" + productId, {
            method: 'delete',
            headers: this.#getHeaders()


        }).then((res) => res.json())
    }
    async deleteUserCart(): Promise<any> {
        return await fetch(this.#baseUrl + "api/v1/cart/", {
            method: 'delete',
            headers: this.#getHeaders()


        }).then((res) => res.json())
    }

    async checkout(cartId: string) {
        return await fetch(this.#baseUrl + "api/v1/orders/checkout-session/" + cartId + "?url=http://localhost:3000", {
            body: JSON.stringify({
                "shippingAddress": {
                    "details": "details",
                    "phone": "01010700999",
                    "city": "Cairo"
                }
            }),
            headers:this.#getHeaders(),
            method:"post"
        }).then((res)=>res.json())
    }

    async  login(email:string , password:string) {
        return await fetch(this.#baseUrl + "api/v1/auth/signin",{
            body:JSON.stringify({
                email,
                password
            }),
            headers:this.#getHeaders(),
            method:"post"
        }).then((res)=>res.json())
    }

    async specificCategory(categoryId:string):Promise<any>{
        return await fetch(this.#baseUrl + "api/v1/categories/" + categoryId ).then((res)=>res.json())
    }

}

export const apiServices = new ApiServices();