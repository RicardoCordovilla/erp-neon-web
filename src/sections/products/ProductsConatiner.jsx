import { Box, Container } from '@mui/material'
import ProductsLists from './ProductsLists'

const ProductsConatiner = ({ items }) => {

    return (
        <Box
            sx={{
                border: '2px solid #bbb',
                borderRadius: 2,
            }}
        >
            <ProductsLists items={items} />
        </Box>
    )
}

export default ProductsConatiner