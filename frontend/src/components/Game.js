import React, {useState, useLayoutEffect, useRef} from "react";
import Typography from '@mui/material/Typography';
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getToken } from '../services/authServices'
import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { MovingComponent } from 'react-moving-text';


function Square({number, value, onPress}){

    return (
        <Button style={{maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'}} variant="contained" number={number} onClick={onPress} className="square">{value}</Button>
    )
}


const Board = React.forwardRef((_props, ref)=>{

    let [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    let [winner, setWinner] = useState(null);
    let [xIsNext, setState] = useState(true);
    const char = useParams().char;

    function isDraw() {
        for (const element of board) {
            for (let j = 0; j < board.length; j++) {
                if (element[j] === ""){
                    return (false)
                }
            }
        }
        return (true)

    }

    function calculateWinner() {
        const lines = [
          [[0, 0], [0, 1], [0, 2]],
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          [[0, 0], [1, 0], [2, 0]],
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          [[0, 0], [1, 1], [2, 2]],
          [[0, 2], [1, 1], [2, 0]],
        ];

        for (const element of lines) {
          const [a, b, c] = element;
          if (board[a[0]][a[1]] !== "" && board[a[0]][a[1]] === board[b[0]][b[1]] &&  board[b[0]][b[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
          }
        }
        return null;
    }

    let status;
    if (winner) {
        status = 'Winner is: ' + winner;
    } 
    else if (isDraw()){
        status = 'Ничья'
    }
    else {
      status = (xIsNext && char === 'x' ) || (!xIsNext && char=== 'o')  ? 'Your move' : 'Opponent move';
    }

    ref.current.addEventListener('message', (event) => {
        const newBoard = board;
        const data = JSON.parse(event.data);
        const row = data.row;
        const col = data.col;
        const moved = data.char

        if (xIsNext && char === 'o' && moved==='x') {
            newBoard[row][col] = 'X';
            setWinner(calculateWinner())
            setState(false);
        }
        else if (!(xIsNext) && char === 'x'  && moved==='o'){
            newBoard[row][col] = 'O';
            setWinner(calculateWinner())
            setState(true);
        }
        setBoard([...newBoard]);
    });

    const handleClick = (row, col) => {
        const newBoard = board
        ref.current.send(JSON.stringify({message:"clicked "+row+col, text:"clicked", event:"MESSAGE"}))
        if (board[row][col] === ""){
            if (xIsNext && char ==='x'){
                newBoard[row][col] = 'X'
                setState(false)
                setWinner(calculateWinner())
                ref.current.send(JSON.stringify({message:'moved',event:'MOVE', row:row, col:col, char:'x'}));
                setBoard([...newBoard]);
            }
            else if (!(xIsNext) && char==='o'){
                newBoard[row][col] = 'O'
                setState(true)
                setWinner(calculateWinner())
                ref.current.send(JSON.stringify({message:'moved',event:'MOVE', row:row, col:col, char:'o'}));
                setBoard([...newBoard]);
            }
        }
    }


    let squares = board.map((row, i) => {
        
        return (
            <div key={i} className="board-row">
                {row.map((col, j)=><Square key={j} onPress={() => handleClick(i, j)} value={board[i][j]} />)}
            </div>
        )
    })

    return (
        <div>


            <Box sx={{
                    marginBottom:8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: "space-between"
                }} >
                <Box sx={{marginBottom: 5}}>
                <Typography color="#1a76d2" component="h1" variant="h4">
                            {status}
                </Typography>
                </Box>
                <div className="board">
                    {squares}
                </div>
            </Box>
        </div>
    )

});


export default function Game(){
    const [ error, setError ] = useState(false);
    const [connected, setConnected] = useState(false);
    const [ready, setReady] = useState(false);
    const {code, char} = useParams();
    const token = getToken();
    const ws = useRef(null);

    useLayoutEffect(()=>{
        if (!ws.current) {
            let host = (window.location.host === window.location.hostname ? window.location.host : window.location.hostname+':8000')
            host = (window.location.protocol === 'https:' ? 'wss' : 'ws') + '://' + host
            const socket = new WebSocket(host+"/ws/room/"+code+"/"+char+"?token="+token)
            ws.current = socket;
        }
        ws.current.onopen = () => {
            ws.current.send(JSON.stringify({ event:"CONNECTED"}))
        }
    
        ws.current.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.connected){
                setConnected(true);
            }
            if (data.ready===true)
            {
                setReady(true);
            }
            if (data.ready === false){
                setReady(false);
            }
    
        });
    
        ws.current.onerror = function () {
            setError(true);
        }

        ws.current.onclose = () => {
            setError(true);
        }

    }, [error, connected, ready, code, char, token])


    
    if (error){
        return(
            <Box sx={{ marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }} pt={5}>
                <Alert variant="string" severity="error" sx={{color:"#d32f2f"}}>
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>reload the page!</strong>
                </Alert>
            </Box>
        )
    }
    if(connected && ready)
    {
        return (

            <Container component="main" maxWidth="xs" >

                    <div className="Game">
                    <MovingComponent
                        type="popIn"
                        duration="800ms"
                        delay="0s"
                        direction="alternate"
                        timing="ease"
                        iteration="1"
                        fillMode="none">

                        <Board ref={ws} />
                    </MovingComponent>
                    </div>

            </Container>
        )
    }
    else if (connected){
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
                px: "auto"}} pt={12} >

                    <MovingComponent
                        type="popIn"
                        duration="1000ms"
                        delay="0s"
                        direction="alternate"
                        timing="ease"
                        iteration="infinite"
                        fillMode="none">

                            <Typography component="h2" variant="h5">
                                            Wait for user...
                            </Typography>
                        </MovingComponent>




                        <Typography component="h1" variant="h4">
                            Room code: <b>{code}</b>
                        </Typography>

            </Box>
        )
    }

}