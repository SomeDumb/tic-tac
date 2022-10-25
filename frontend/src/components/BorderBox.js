import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AccountMenu from './Profile'

export const BorderBox = ({children, setToken}) => (
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
            <Grid container justifyContent="flex-end">
                <AccountMenu setToken={setToken}/>
            </Grid>
            {children}
        </Box>
    </Container>

  );