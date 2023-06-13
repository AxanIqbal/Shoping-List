import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Product } from "../redux/api";

interface ProductTileProps {
  product: Product;
}

function ProductTile({ product }: ProductTileProps) {
  return (
    <Card
      sx={{
        width: "350px",
        height: "450px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt="Product Image"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={1}
          >
            <Typography variant={"h6"}>{product.title}</Typography>
            <Stack alignItems={"end"}>
              {/*<Typography variant={'body2'} color={'red'} fontSize={'11px'}>{(product.price*(product.discountPercentage/100)).toFixed(2)}$ Off</Typography>*/}
              <Typography variant={"body1"}>
                {product.price.toFixed(2)}$
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"} spacing={1}>
            <Typography variant={"body1"}>{product.description}</Typography>
            <Typography variant={"body2"} color={"green"}>
              {product.discountPercentage}%
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Typography variant={"subtitle1"}>{product.category}</Typography>
      </CardActions>
    </Card>
  );
}

export default ProductTile;
