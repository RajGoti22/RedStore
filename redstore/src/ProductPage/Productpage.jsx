import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, FormControl, Select,
  MenuItem, InputLabel, CircularProgress
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductPage/ProductCard';
import axios from 'axios';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase() || '';

  // ✅ Safe utils
  const safeLower = (str = '') => String(str).toLowerCase();
  const safeNum = (n) => (typeof n === 'number' ? n : 0);

  // ✅ Fetch products
  useEffect(() => {
    axios
      .get('https://redstore-vcct.onrender.com/api/products')
      .then(({ data }) => {
        if (data?.products?.length) {
          setAllProducts(data.products);
          setDisplayed(data.products);
        } else {
          setAllProducts([]);
          setDisplayed([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setAllProducts([]);
        setDisplayed([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Filtering and sorting
  useEffect(() => {
    let prods = [...allProducts];

    if (searchTerm) {
      prods = prods.filter(p =>
        safeLower(p?.title).includes(searchTerm) ||
        safeLower(p?.description).includes(searchTerm)
      );
    }

    if (category !== 'all') {
      prods = prods.filter(p => p?.category === category);
    }

    switch (sortBy) {
      case 'priceAsc':
        prods.sort((a, b) => safeNum(a.price) - safeNum(b.price));
        break;
      case 'priceDesc':
        prods.sort((a, b) => safeNum(b.price) - safeNum(a.price));
        break;
      case 'ratingAsc':
        prods.sort((a, b) => safeNum(a.rating) - safeNum(b.rating));
        break;
      case 'ratingDesc':
        prods.sort((a, b) => safeNum(b.rating) - safeNum(a.rating));
        break;
      default:
        break;
    }

    setDisplayed(prods);
  }, [searchTerm, allProducts, category, sortBy]);

  // ✅ Loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Products {searchTerm && `– “${searchTerm}”`}
        </Typography>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Category Filter */}
          <FormControl size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {[...new Set(allProducts.map(p => p.category).filter(Boolean))].map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat.replace(/-/g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort Filter */}
          <FormControl size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="priceAsc">Price: Low → High</MenuItem>
              <MenuItem value="priceDesc">Price: High → Low</MenuItem>
              <MenuItem value="ratingAsc">Rating: Low → High</MenuItem>
              <MenuItem value="ratingDesc">Rating: High → Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Grid */}
      <Grid container spacing={3} justifyContent="center">
        {displayed.length ? (
          displayed.map((prod) => (
            <Grid key={prod.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                id={prod.id}
                image={prod.thumbnail}
                title={prod.title}
                price={prod.price}
                rating={prod.rating}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No products found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Products;
