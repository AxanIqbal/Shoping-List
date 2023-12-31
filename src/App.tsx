import { useCallback, useState } from 'react'
import {
	AppBar,
	Box,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
	Stack,
	Toolbar,
	Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useProducts } from './hooks'
import ProductTile from './components/ProductTile.tsx'
import { SearchInput } from './components/SearchInput.tsx'
import { ProductTileSkeleton } from './components/Skeletons.tsx'
import {EmptyLottie, ErrorLottie, Lottie} from './components/Lottie.tsx'

function App() {
	const {
		list,
		searchList,
		categories,
		filterCategory,
		sortList,
		isLoading,
		error
	} = useProducts()
	const [page, setPage] = useState(0)

	console.log(categories)

	const onPaginationChange = useCallback((_, page: number) => {
		setPage(page - 1)
	}, [])

	const onSearch = useCallback(
		(event: any) => {
			searchList(event.target.value)
		},
		[searchList]
	)

	return (
		<main style={{minHeight: '100vh'}}>
			<AppBar position='static' sx={{background: 'cadetblue'}}>
				<Toolbar>
					<Typography variant={'h4'}>Ahsan Iqbal</Typography>
				</Toolbar>
			</AppBar>
			<Stack padding={8} spacing={2}>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					width={'100%'}
					alignItems={{ xs: 'start', md: 'center' }}
					spacing={2}
				>
					<Typography>Filters:</Typography>
					<Stack
						direction={{ xs: 'column', md: 'row' }}
						justifyContent={'space-between'}
						width={'100%'}
						gap={2}
					>
						<Stack direction={'row'} gap={2} flexWrap={'wrap'}>
							<FormControl fullWidth sx={{ width: '300px' }}>
								<InputLabel id='category-label'>Category</InputLabel>
								<Select
									size={'small'}
									defaultValue={'all'}
									labelId={'category-label'}
									label={'Category'}
									onChange={event =>
										filterCategory(event.target.value as string)
									}
								>
									<MenuItem value={'all'}>All</MenuItem>
									{categories.map(category => (
										<MenuItem key={category} value={category}>
											{category
												.replace('-', ' ')
												.replace(/\b\w/g, function (m) {
													return m.toUpperCase()
												})}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl fullWidth sx={{ width: '300px' }}>
								<InputLabel id='sort-label'>Sort</InputLabel>
								<Select
									size={'small'}
									labelId={'sort-label'}
									label={'Sort'}
									defaultValue={'ASC'}
									onChange={event => sortList(event.target.value as string)}
								>
									<MenuItem value={'ASC'}>ASC</MenuItem>
									<MenuItem value={'DESC'}>DESC</MenuItem>
								</Select>
							</FormControl>
						</Stack>
						<SearchInput
							placeholder={'Search...'}
							onChange={onSearch}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								)
							}}
						/>
					</Stack>
				</Stack>

				{error ? (
					<ErrorLottie error={error?.data}/>
				) : (
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'stretch',
							justifyContent: 'center',
							gap: 4
						}}
					>
						{isLoading ? (
							Array.from(Array(8).keys()).map(value => (
								<ProductTileSkeleton key={value} />
							))
						) : list.length > 0 ? (
							list
								.slice(page * 8, page * 8 + 8)
								.map(value => <ProductTile product={value} key={value.id} />)
						) : (
							<EmptyLottie/>
						)}
					</Box>
				)}
				<Pagination
					count={Math.ceil(list.length / 8)}

					color='primary'
					onChange={onPaginationChange}
					sx={{ alignSelf: { xs: 'center', md: 'end' }, ul: {"& .Mui-selected": {background: 'cadetblue'} }}}
				/>
			</Stack>
		</main>
	)
}

export default App
