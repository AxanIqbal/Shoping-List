import { Card, CardActions, CardContent, Skeleton, Stack } from '@mui/material'

export function ProductTileSkeleton() {
	return (
		<Card
			sx={{
				width: '350px',
				height: '450px',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Skeleton height={'200px'} variant='rectangular' />
			<CardContent>
				<Stack spacing={1}>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={1}
					>
						<Skeleton height={'35px'} width={'200px'} />
						<Skeleton width={'50px'} variant={'text'} />
					</Stack>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						spacing={1}
						alignItems={'start'}
					>
						<Skeleton height={'80px'} width={'240px'} variant={'rounded'} />
						<Skeleton variant={'text'} width={'50px'} />
					</Stack>
				</Stack>
			</CardContent>
			<CardActions sx={{ marginTop: 'auto' }}>
				<Skeleton width={'150px'} variant={'text'} />
			</CardActions>
		</Card>
	)
}
