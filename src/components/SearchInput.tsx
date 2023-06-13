import { styled, TextField } from '@mui/material'

export const SearchInput = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-root': {
		borderRadius: '10px'
	},
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1.5, 1, 1.5),
		borderRadius: '30px'
	}
}))
