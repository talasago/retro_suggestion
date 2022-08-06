import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHeader from "./component/AppHeader";
import { Container } from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import retrospectiveData from "./retrospective.json";
import retrospectivePurposeName from "./retrospective_purpose_name.json";

class Search extends React.Component {
  render() {
    return (
      <>
        <div>
          <SearchCheckBox />
        </div>
        <div>
          <Button variant="contained" startIcon={<SearchIcon />}>
            検索
          </Button>
        </div>
      </>
    );
  }
}

class SearchCheckBox extends React.Component {
  //TODO:チェックボックスの内容の状態をもつ

  render() {
    const checkBoxes = Object.entries(retrospectivePurposeName).map(
      ([num, name]) => {
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={name}
            labelPlacement="start"
          />
        );
      }
    );

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">ふりかえり目的</FormLabel>
        <FormGroup aria-label="position" row>
          {checkBoxes}
        </FormGroup>
      </FormControl>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Container>
          <Search />
        </Container>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
