import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBar = props => {
  const { getAutoComplete, getCityWeather, cityNames, inputError } = props;
  const styles = {
    borderRadius: "10px",
    backgroundColor: "white"
  };

  const printOptions = cityNames.length > 0 ? cityNames : [];

  return (
    <div style={{ width: "90%", margin: "10px auto" }}>
      <Autocomplete
        onChange={(event, value) => getCityWeather(value)}
        freeSolo
        disableClearable
        options={printOptions}
        renderInput={params => (
          <TextField
            onChange={event => getAutoComplete(event.target.value)}
            style={styles}
            size="medium"
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <S.ErrorMsg>{inputError}</S.ErrorMsg>
    </div>
  );
};

export default SearchBar;

const S = {};

S.ErrorMsg = styled.p`
  color: red;
  font-size: 1.5rem;
  font-family: "Lato";
`;
