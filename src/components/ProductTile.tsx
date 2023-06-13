import {Card, CardActions, CardContent, CardMedia, Stack, styled, Typography} from '@mui/material'
import {Product} from '../redux/api'

interface ProductTileProps {
    product: Product
}

const Description = styled(Typography)(() => ({
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "line-clamp": "3",
    "-webkit-box-orient": "vertical",
}))

const Title = styled(Typography)(() => ({
    height: "70px",
	overflow: "hidden",
	display: "-webkit-box",
	"-webkit-line-clamp": "2",
	"line-clamp": "2",
	"-webkit-box-orient": "vertical",
}))

function ProductTile({product}: ProductTileProps) {
    return (
        <Card
            sx={{
                width: '350px',
                height: '450px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                background: 'whitesmoke',
                boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff'
            }}
        >
            <CardMedia
                component='img'
                height='200'
                image={product.images[0]}
                alt='Product Image'
                sx={{objectFit: 'cover'}}
            />
            <CardContent>
                <Stack spacing={1}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        // alignItems={'center'}
                        spacing={1}
                    >
                        <Title variant={'h6'} fontWeight={'bold'}>
                            {product.title}
                        </Title>
                        <Stack alignItems={'end'} width={'90px'}>
                            <Typography variant={'body1'} fontWeight={'bold'}>
                                {product.price.toFixed(2)}$
                            </Typography>
                            <Typography variant={'body2'} color={'green'} sx={{display: 'block'}}>
                                {product.discountPercentage}% off
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={1}>
                        <Description variant={'body1'}>{product.description}</Description>
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions sx={{marginTop: 'auto', marginX: 'auto'}}>
                <Typography fontSize={'18px'} sx={{textTransform: 'capitalize', textAlign: 'center'}}>
                    {product.category.replace('-', ' ')}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default ProductTile
