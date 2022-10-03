import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import TabPanel from '@mui/lab/TabPanel';


import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[200],
    },
  },
});


function ConnectToRoom(){

    return (
        <Box sx={{ m: 5, width: 250, height: '100px', }}>
            <TextField 
            inputProps={{ style: { textTransform: "uppercase" } }} 
            margin="normal"
            fullWidth
            autoFocus
            label="Code"
            />
            <Button>
                Connect
            </Button>
        </Box>
    )

}


function CreateRoom(){
    const [code, setCode] = useState();

    

    return (
        <Box sx={{ 
            m: 5, width: 250, 
            '& button': { m: 1 },
            height: '100px',
        }}>


            <Button size="large" variant="contained">
                o
            </Button>
            <Button size="large" variant="contained">
                x
            </Button>
            <Typography component="h1" variant="h6">
                CHOOSE CHARACTER
            </Typography>
        </Box>
    )
}


export default function Menu(){

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };


    

    return (
        <div className="menu">
            <ThemeProvider theme={theme}>
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
                    }}
                    >
                        <Box 
                        sx={{
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                width: 1, 
                                borderBottom: 1, 
                                borderColor: 'divider' 
                            }}
                            >
                            <Typography component="h1" variant="h4">
                                Options
                            </Typography>
                            <Tabs value={tabIndex} onChange={handleTabChange}>
                                <Tab label="Connect" />
                                <Tab label="Create"  />
                            </Tabs>
                        </Box>
                        {tabIndex === 0 && (
                            <ConnectToRoom/>
                        )}
                        {tabIndex === 1 &&(
                            <CreateRoom />
                        )}
                </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}