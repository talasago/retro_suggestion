import React from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

import retrospectiveData from "../retrospective.json";
import retrospectivePurposeName from "../retrospectivePurposeName.json";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPurposes: [],
      errorMessage: null,
    };
  }

  handleChangeCheckedPurposes(event) {
    const checkedPurposes = this.state.checkedPurposes;
    const targetValue = parseInt(event.target.value, 10);
    const changedCheckedPurposes = event.target.checked
      ? [...checkedPurposes, targetValue]
      : checkedPurposes.filter(
          (checkedPurpose) => checkedPurpose !== targetValue
        );

    this.setState({
      checkedPurposes: changedCheckedPurposes,
    });
  }

  handleClickSearch(func) {
    if (this.state.errorMessage !== null) {
      this.setState({ errorMessage: null });
    }
    if (this.state.checkedPurposes.length === 0) {
      this.setState({
        errorMessage: "チェックを入れて検索してください",
      });
      return;
    }

    const matchedRetrospectives = retrospectiveData.retrospectives.filter(
      (retrospective) => {
        //チェックボックスはAND条件で検索する
        return this.state.checkedPurposes.every((checkedPurpose) => {
          return retrospective.purposes.includes(checkedPurpose);
        });
      }
    );

    const determinedRetrospective =
      matchedRetrospectives[
        Math.floor(Math.random() * matchedRetrospectives.length)
      ];
    func(determinedRetrospective);
  }

  render() {
    const alert =
      this.state.errorMessage === null ? null : (
        <Alert severity="error">{this.state.errorMessage}</Alert>
      );

    const checkBoxes = Object.entries(retrospectivePurposeName).map(
      ([num, name]) => {
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={name}
            onChange={(e) => this.handleChangeCheckedPurposes(e)}
            value={num}
            key={num}
          />
        );
      }
    );

    const checkBoxesArea = (
      <FormControl component="fieldset">
        <FormLabel component="legend">ふりかえり目的</FormLabel>
        <FormGroup aria-label="position" row>
          {checkBoxes}
        </FormGroup>
      </FormControl>
    );

    const searchButton = (
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={() => this.handleClickSearch(this.props.onClick)}
      >
        検索
      </Button>
    );

    return (
      <>
        {alert}
        <div>{checkBoxesArea}</div>
        <div>{searchButton}</div>
      </>
    );
  }
}
