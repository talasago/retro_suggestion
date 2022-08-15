import React from "react";

import { Box } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";

import retrospectiveData from "../retrospective.json";
import retrospectiveSceneName from "../retrospectiveSceneName.json";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedScenes: [],
      errorMessage: null,
    };
  }

  handleChangeCheckedScenes(event) {
    const checkedScenes = this.state.checkedScenes;
    const targetValue = parseInt(event.target.value, 10);
    const changedCheckedScenes = event.target.checked
      ? [...checkedScenes, targetValue]
      : checkedScenes.filter(
          (checkedScene) => checkedScene !== targetValue
        );

    this.setState({
      checkedScenes: changedCheckedScenes,
    });
  }

  handleClickSearch(func) {
    if (this.state.errorMessage !== null) {
      this.setState({ errorMessage: null });
    }
    if (this.state.checkedScenes.length === 0) {
      this.setState({
        errorMessage: "チェックを入れて検索してください",
      });
      return;
    }

    const matchedRetrospectives = retrospectiveData.retrospectives.filter(
      (retrospective) => {
        //チェックボックスはAND条件で検索する
        return this.state.checkedScenes.every((checkedScene) => {
          return retrospective.easyToUseScenes.includes(checkedScene);
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

    const checkBoxes = Object.entries(retrospectiveSceneName).map(
      ([num, name]) => {
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={name}
            onChange={(e) => this.handleChangeCheckedScenes(e)}
            value={num}
            key={num}
          />
        );
      }
    );

    const checkBoxesArea = (
      <FormControl component="fieldset">
        <FormLabel component="legend">場面ごとで使いやすいふりかえり手法</FormLabel>
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
        <Box sx={{ m: 1.5 }}>
          {alert}
          {checkBoxesArea}
          <div>{searchButton}</div>
        </Box>
      </>
    );
  }
}
