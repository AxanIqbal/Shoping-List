import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
	endpoints: builder => ({
		getAllProducts: builder.query<GetAllProductsResponse, void>({
			query: () => '/products'
		})
	})
})

interface GetAllProductsResponse {
	products: Product[]
	total: number
	skip: number
	limit: number
}

export interface Product {
	id: number
	title: string
	description: string
	price: number
	images: string[]
	category: string
	thumbnail: string
	discountPercentage: number
}

export const { useGetAllProductsQuery } = productsApi
