// productSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
    name: 'books',
    initialState: [], // Initial state is an empty array
    reducers: {
        setProducts: (state, action) => {
            // Use this reducer to update the products in the store
            return action.payload;
        },
        addProduct: (state, action) => {
            // Use this reducer to add a new product to the store
            state.push(action.payload);
        },
    },
});

export const { setProducts, addProduct } = bookSlice.actions;

// // product.js (Usage of Redux actions)
// import { useDispatch } from 'react-redux';
// import { addProduct } from './productSlice'; // Import your Redux actions
//
// const newProduct = { /* New product data */ };
// dispatch(addProduct(newProduct)); // Dispatch the action to add the new product
//
// // product-view.js (Usage of Redux store)
// import { useSelector } from 'react-redux';
// import { selectProducts } from './productSlice'; // Import your Redux selector
//
// const products = useSelector(selectProducts); // Get the products from the Redux store
