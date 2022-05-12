import * as React from "react";
import Axios from "axios";
import {ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {MapDisplay} from "./MapDisplay";
import Slider from "@mui/material/Slider";
import {Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {CountiesMapDisplay} from "./CountiesMapDisplay";


export default function Counties() {


    // const getQuotes = async () => {
    //     const response = await Axios.get(`http://localhost:3001/insurance/${postcode}/${age}`)
    //     console.log(response);
    //     if(response.data.averagedModel){
    //         filterCarsQuotes(response.data.averagedModel, covertRangeToPrice(priceRange[0]), covertRangeToPrice(priceRange[1]));
    //     }
    //     setResults(response.data);
    // }

    return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={"/CTM Logo.png"} />
                    <Typography component="h1" style={{marginTop: "20px"}} variant="h5">
                        Average quotes by county
                    </Typography>

                    <CountiesMapDisplay />
                </Box>

            </Container>

    );
}