import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography variant="h3">page not found</Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{ width: 250, height: "50px" }}
          >
            Go home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
