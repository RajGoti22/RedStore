import React from 'react';
import { Box, Typography, Card, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import img1 from '../assets/images/category-1.jpg';
import img2 from '../assets/images/category-2.jpg';
import img3 from '../assets/images/category-3.jpg';

// Sample image data
const categories = [
  { id: 1, img: img1, alt: 'Category 1' },
  { id: 2, img: img2, alt: 'Category 2' },
  { id: 3, img: img3, alt: 'Category 3' }
];

function FeaturedCategories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // below 600px

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: { xs: '20px', sm: '24px' },
          mb: 1,
        }}
      >
        Featured Categories
      </Typography>

      <Box
        sx={{
          width: 100,
          height: 4,
          backgroundColor: 'red',
          margin: '0 auto 40px auto',
          borderRadius: 2,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 2, sm: 3 },
        }}
      >
        {categories.map((cat) => (
          <Card
            key={cat.id}
            sx={{
              width: { xs: '90%', sm: 290 },
              height: { xs: 200, sm: 330 },
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <CardMedia
              component="img"
              image={cat.img}
              alt={cat.alt}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default FeaturedCategories;
