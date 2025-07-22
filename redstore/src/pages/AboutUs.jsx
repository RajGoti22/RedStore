import React from 'react';
import { Box, Typography, Container, Grid, Paper, Divider } from '@mui/material';

const Section = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, mb: 4, background: '#fff', borderRadius: 2 }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom color="000">
      {title}
    </Typography>
    {children}
  </Paper>
);

export default function AboutUs() {
  return (
    <Box sx={{ backgroundColor: '#f9f9f9', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          <span style={{ color: '#000' }}>About </span>
          <span style={{ color: '#ff523b', fontSize: '45px' }}>RedStore</span>
        </Typography>

        <Typography variant="subtitle1" align="center" color="black" sx={{ mb: 6 }}>
          Where Workout Meets Style — Performance You Can Feel
        </Typography>

        <Section title="Who We Are">
          <Typography>
            <strong>RedStore</strong> is a performance-focused activewear brand helping athletes, fitness lovers, and everyday warriors feel powerful, confident, and stylish.
            Our gear moves with you — from gym sessions to daily hustle.
          </Typography>
        </Section>

        <Section title="What We Offer">
          <Grid container spacing={2}>
            {[
              "Moisture-wicking Workout T-Shirts",
              "Breathable Activewear Shirts",
              "Stretchable Training Pants",
              "Performance Gym Shorts",
              "Cushioned Sports Shoes",
              "Bold, Minimal, and Functional Styles"
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Typography>• {item}</Typography>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section title="Our Mission">
          <Typography>
            To empower your fitness journey with premium, performance-driven apparel that motivates and supports every move, regardless of your level or goal.
          </Typography>
        </Section>

        <Section title="Why Choose RedStore?">
          <Grid container spacing={2}>
            {[
              "Built for Intensity – Designed for Comfort",
              "Tested by Athletes, Loved by All",
              "Affordable Premium Quality",
              "Fast Delivery & Easy Returns",
              "Always Fresh Drops & Limited Editions"
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Typography>• {item}</Typography>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section title="Join Our Movement">
          <Typography>
            RedStore is more than fitness wear — it’s a movement. Join our growing community of movers, lifters, and go-getters. Follow us on social media and stay inspired!
          </Typography>
        </Section>

        <Divider sx={{ my: 5 }} />

        <Typography
          variant="h6"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#555',
            textDecoration: 'underline',
            fontSize: { xs: '18px', md: '24px' },
          }}
        >
          RedStore - Give Your Workout A New Style!
        </Typography>
      </Container>
    </Box>
  );
}
