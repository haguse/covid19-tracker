import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import covidLogo from "./coronavirus.svg";
import { fetchCountries } from "./api";
import AreaChart from "./components/AreaChart";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width:"50%"
  },
}));

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };
    fetchCountriesData();
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img
            src={covidLogo}
            alt="Covid19 Logo"
            style={{ width: "100px", height: "100px", marginTop: "20px" }}
          ></img>

          <FormControl className={classes.formControl}>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country) => {
                return (
                  <MenuItem value={country.Slug}>{country.Country}</MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Chart */}

          <Grid item xs={12}>
            <AreaChart />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
