import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import {Table, TableRow, TableCell, TableHead, TableBody, Link} from "@mui/material";
import {MapDisplay} from "./MapDisplay";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Disclaimer: This is estimated data based on your area, and not an offer of insurance.
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {

    const [postcode,setPostcode] = React.useState("");
    const [age, setAge] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [priceRange, setPriceRange] = React.useState([0, 400]);
    const [filteredCars, setFilteredCars] = React.useState([]);

    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
        if(results.averagedModel){
            filterCarsQuotes(results.averagedModel, covertRangeToPrice(newValue[0]), covertRangeToPrice(newValue[1]));
        }
    };

    const filterCarsQuotes = (carQuotes, lower, higher) => {
        const filtered = carQuotes.filter((car) => car.annualPremium >= lower && car.annualPremium <= higher)
        setFilteredCars(filtered);
    }

    const covertRangeToPrice = (range) => {
        return Math.round(range*range/200.0);
    }

    const getQuotes = async () => {
        const response = await Axios.get(`http://localhost:3001/insurance/${postcode}/${age}`)
        console.log(response);
        if(response.data.averagedModel){
            filterCarsQuotes(response.data.averagedModel, covertRangeToPrice(priceRange[0]), covertRangeToPrice(priceRange[1]));
        }
        setResults(response.data);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                        What cars can you insure?
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="postcode"
                            label="Postcode"
                            name="postcode"
                            autoComplete="postcode"
                            autoFocus
                            onChange={(event) => setPostcode(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="age"
                            label="Age"
                            id="age"
                            onChange={(event) => setAge(event.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={getQuotes}
                        >
                            Find Cars
                        </Button>

                    </Box>
                    <MapDisplay sourcePoint={{postcode:postcode, lat:null, lon:null, radius:5000}}/>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />

                <Box sx={{ width: 400 }}>
                    <Typography component="h3" style={{marginTop: "20px"}} variant="subtitle">
                        Set your price range
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        max={1000}
                        scale={(x) => covertRangeToPrice(x)}
                    />
                </Box>
            </Container>
            <Container component="div" >
                <Box >
                {filteredCars?.length > 0 ?
                    (
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Image
                            </TableCell>
                            <TableCell>
                                Make
                            </TableCell>
                            <TableCell>
                                Model
                            </TableCell>
                            <TableCell>
                                Average premium
                            </TableCell>
                            <TableCell>
                                Affiliate links
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {filteredCars?.sort((a, b) => a.annualPremium - b.annualPremium).map((car, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <img src={"/carimg.jpeg"} height={"100px"}/>
                            </TableCell>
                            <TableCell>
                                {car.Make}
                            </TableCell>
                            <TableCell>
                                {car.Model}
                            </TableCell>
                            <TableCell>
                                {car.annualPremium}
                            </TableCell>
                            <TableCell>
                                <Link >Carwow</Link>
                                <br/>
                                <Link >AutoTrader</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                    ): null}
                <div style={{height:"100vh"}}></div>
                </Box>
            </Container>
        </ThemeProvider>
    );
}