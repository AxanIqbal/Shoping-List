import { useCallback, useState } from "react";
import {
  AppBar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useProducts } from "./hooks";
import ProductTile from "./components/ProductTile.tsx";

function App() {
  const { list, searchList, categories, filterCategory, sortList } =
    useProducts();
  const [page, setPage] = useState(0);

  const onPaginationChange = useCallback((_, page: number) => {
    setPage(page - 1);
  }, []);

  const onSearch = useCallback(
    (event: any) => {
      searchList(event.target.value);
    },
    [searchList]
  );

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant={"h4"}>Ahsan Iqbal</Typography>
        </Toolbar>
      </AppBar>
      <Stack padding={8} spacing={2}>
        <Stack direction={"row"} width={"100%"} alignItems={"center"}>
          <Typography marginRight={2}>Filters:</Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"row"} spacing={2}>
              <FormControl fullWidth sx={{ width: "350px" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  defaultValue={""}
                  labelId={"category-label"}
                  label={"Category"}
                  onChange={(event) =>
                    filterCategory(event.target.value as string)
                  }
                >
                  <MenuItem value={""}>-</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category
                        .replace("-", " ")
                        .replace(/\b\w/g, function (m) {
                          return m.toUpperCase();
                        })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="sort-label">Sort</InputLabel>
                <Select
                  labelId={"sort-label"}
                  label={"Sort"}
                  defaultValue={"ASC"}
                  onChange={(event) => sortList(event.target.value as string)}
                >
                  <MenuItem value={"ASC"}>ASC</MenuItem>
                  <MenuItem value={"DESC"}>DESC</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField label={"Search"} onChange={onSearch} />
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {list.slice(page * 8, page * 8 + 8).map((value) => (
            <ProductTile product={value} key={value.id} />
          ))}
        </Box>
        <Pagination
          count={Math.ceil(list.length / 8)}
          color="primary"
          onChange={onPaginationChange}
          sx={{ alignSelf: { sm: "center", md: "end" } }}
        />
      </Stack>
    </main>
  );
}

export default App;
