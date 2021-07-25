import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import covidLogo from "./coronavirus.svg";
import { fetchCountries } from "./api";
import AreaChart from "./components/AreaChart";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width: "50%",
  },
}));

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries.sort((a, b) => (a.Country < b.Country ? -1 : 1)));
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
            <h3>Select Country</h3>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country, id) => {
                return (
                  <MenuItem key={id} value={country.Slug}>
                    {country.Country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Chart */}

          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
