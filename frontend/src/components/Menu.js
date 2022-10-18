import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { getRoom, createRoom } from '../services/roomServices';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[200],
    },
  },
});


function ConnectMenu({setToken}){

    const [code, setCode] = useState('');
    const [errorText, setErrorText] = useState('');
    const [chooseChar, setChooseChar] = useState(false);
    const navigate = useNavigate();

    const handleClick = async (e) => {

        if (code.length !== 5){
            setErrorText('Code must be 5 characters');
        }
        else{
            setErrorText('');
            await getRoom(code, setToken).then(room =>{

                if (room.o_user === null && room.x_user === null){
                    setChooseChar(true);
                }
                else if (room.o_user !== null) {
                    charChoosed('x');
                }
                else if (room.x_user !== null){
                    charChoosed('o');
                }

            }).catch((err) => { setErrorText('Room Not Found') });
        }
    };

    const handleChange = (e) => {
        const code = e.target.value.toUpperCase();
        if (code.length < 6 && !(/\s/g.test(code))) {
            setCode(code);
            setErrorText('');
        }
    };

    const charChoosed = (char) => {
        navigate('game/'+code+'/'+char+'/');
    }

    if (chooseChar === false){
        return (
            <Box sx={{ m: 5, width: 250, height: '100px', }}>
                <TextField 
                autoCapitalize='characters'
                margin="normal"
                fullWidth
                autoFocus
                label="Code"
                value={code}
                error={errorText.length === 0 ? false : true}
                helperText={errorText}
                onChange={handleChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleClick();
                    }
                }}
                />
                <Button type="submit" onClick={handleClick}>
                    Connect
                </Button>
            </Box>
        )
    }
    else{
        return(
            <ChooseChar setChar={charChoosed} />
        )
    }

}


function ChooseChar({setChar}){

    return(
        <Box sx={{ m: 5, width: 250, height: '100px', display: 'flex', flexDirection: 'column', 
        alignItems: 'center', '& button': { m: 1 },}}>

            <Box sx={{display: 'flex', }}>
                <Button 
                    style={{minWidth: '80px', minHeight: '50px'}} 
                    size="large" 
                    variant="contained"
                    onClick={e => setChar('o')}
                >
                    o
                </Button>
            <Button 
                style={{minWidth: '80px', minHeight: '50px'}} 
                size="large" 
                variant="contained"
                onClick={e => setChar('x')}
            >
                x
            </Button>
            </Box>
            <Box sx={{display: 'flex', }}>
            <Typography component="h1" variant="h6">
                CHOOSE CHARACTER
            </Typography>
            </Box>
        </Box>
    )
}

function CreateRoomMenu({ setToken }){
    const navigate = useNavigate();

    const handleCharClick = async (char) => {
        await createRoom(setToken).then( 
            createdRoom =>  {
                getRoom(createdRoom.code, setToken).then( room =>{
                    navigate('game/'+room.code+'/'+char+'/')
                });
            });
    }

    return (
        <ChooseChar setChar={handleCharClick} />
    )
}


export default function Menu({ setToken }){

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
                        <Box sx={{
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                width: 1, 
                            }}>
                            {tabIndex === 0 && (
                                <ConnectMenu setToken={setToken} />
                            )}
                            {tabIndex === 1 &&(
                                <CreateRoomMenu setToken={setToken} />
                            )}
                        </Box>

                </Container>
            </ThemeProvider>
        </div>
    )
}