import { Product, useGetAllProductsQuery } from '../redux/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'

/// Handling the product fetching process with filtering and sorting
export function useProducts() {
	const { data, isLoading, error } = useGetAllProductsQuery()
	const [list, setList] = useState<Product[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [filterOption, setFilterOption] = useState('')
	const [sortOption, setSortOption] = useState('ASC')

	const categories = useMemo(() => {
		if (data?.products) {
			return [...new Set(data.products.map(e => e.category))]
		}
		return []
	}, [data?.products])

	useEffect(() => {
		if (!data) {
			return
		}

		let filteredList = data.products

		if (searchQuery !== '') {
			const fuse = new Fuse(filteredList, {
				keys: ['title', 'description'],
				threshold: 0.3
			})
			filteredList = fuse.search(searchQuery).map(e => e.item)
		}

		if (filterOption !== '') {
			filteredList = filteredList.filter(e => e.category === filterOption)
		}

		if (sortOption === 'DESC') {
			filteredList = [...filteredList].sort((a, b) =>
				b.title.localeCompare(a.title)
			)
		} else {
			filteredList = [...filteredList].sort((a, b) =>
				a.title.localeCompare(b.title)
			)
		}

		console.log(filteredList)

		setList(filteredList)
	}, [data, filterOption, searchQuery, sortOption])

	/// Search for products
	const searchList = useCallback((search: string) => {
		setSearchQuery(search)
	}, [])

	/// Sort List by ASC and DESC
	const sortList = useCallback((option: string) => {
		console.log(option)
		setSortOption(option)
	}, [])

	/// Filter Category
	const filterCategory = useCallback((category: string) => {
		setFilterOption(category)
	}, [])

	return {
		list,
		data,
		isLoading,
		error,
		searchList,
		filterCategory,
		categories,
		sortList
	}
}
