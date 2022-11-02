import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AccountMenu from "./Profile";
import Paper from "@mui/material/Paper";

export const BorderBox = ({ children, setToken }) => (
  <Container component="main" maxWidth="xs">
    <Paper elevation={8}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "350px",
        }}
      >
        <Grid container justifyContent="flex-end">
          <AccountMenu setToken={setToken} />
        </Grid>
        {children}
      </Box>
    </Paper>
  </Container>
);
