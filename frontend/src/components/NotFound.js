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
          width: 1,
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">page not found</Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{ marginTop: 10, width: 300, height: "50px" }}
          >
            Go home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
