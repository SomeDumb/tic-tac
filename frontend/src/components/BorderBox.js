import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const BorderBox = ({children}) => (
    <Container component="main" maxWidth="xs" >
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: 1,
            borderRadius: '16px',
            borderColor: 'primary.main',
            height: '350px'
        }}
        >
            {children}
        </Box>
    </Container>
  );