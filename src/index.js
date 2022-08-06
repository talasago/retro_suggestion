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
  constructor(props) {
    super(props);
    this.state = {
      checkedPurposes: []
    };
  }

  handleChangeCheckedPurposes(event) {
    const checkedPurposes = this.state.checkedPurposes;
    const targetValue = parseInt(event.target.value, 10);
    const changedCheckedPurposes = event.target.checked
      ? [...checkedPurposes, targetValue]
      : checkedPurposes.filter(checkedPurpose => checkedPurpose !== targetValue);

    this.setState({
      checkedPurposes: changedCheckedPurposes,
    });
  }

  handleClickSearch() {
    const matchedRetrospectives = retrospectiveData.retrospectives.filter(
      (retrospective) => {
        for (let checkedPurpose of this.state.checkedPurposes) {
          if (retrospective.purposes.includes(checkedPurpose)) {
            return true;
          }
        }
        return false;
      }
    );
    console.log(matchedRetrospectives);
  }

  render() {
    return (
      <>
        <div>
          <SearchCheckBox
            onChange={(e) => this.handleChangeCheckedPurposes(e)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={() => this.handleClickSearch()}
          >
            検索
          </Button>
        </div>
      </>
    );
  }
}

class SearchCheckBox extends React.Component {
  render() {
    const checkBoxes = Object.entries(retrospectivePurposeName).map(
      ([num, name]) => {
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={name}
            onChange={(e) => this.props.onChange(e)}
            value={num}
            key={num}
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
