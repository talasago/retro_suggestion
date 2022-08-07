import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHeader from "./component/AppHeader";
import { Container, Card, Box, Paper } from "@mui/material";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import retrospectiveData from "./retrospective.json";
import retrospectivePurposeName from "./retrospective_purpose_name.json";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import SimpleZoom from "./component/SimpleZoom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedPurposes: [],
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

  //TODO:チェックオフの場合はエラーにしたい
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

    return matchedRetrospectives[
      Math.floor(Math.random() * matchedRetrospectives.length)
    ];
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
            onClick={() => {
              const retrospective = this.handleClickSearch();
              this.props.onClick(retrospective);
            }}
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

class Result extends React.Component {
  render() {
    const purposes = this.props.purposes;
    let purpose = null;
    if (purposes !== null && purposes !== undefined) {
      purpose = purposes
        .map((val, idx) => {
          return retrospectivePurposeName[String(val)];
        })
        .join("、");
    }

    //進め方は、li要素  の方がいいかも
    //
    //  const texts = hoge.split(/(\n)/).map((val, idx) => {
    //    return (
    //      <>
    //      {val.match(/\n/) ? <br /> : val}
    //      </>
    //    );
    //  })
    //  return <div>{texts}</div>;

    //TODO:最初進め方とURLは非表示にしたいなあ

    return (
      <Box>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {this.props.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {purpose}
            </Typography>
            進め方
            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {this.props.wayOfProceeding}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={this.props.reference} target="_blank">
              参考元リンク
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      determinedRetrospective: {
        title: null,
        purposes: null,
        wayOfProceeding: null,
        reference: null,
      },
    };
  }

  render() {
    return (
      <div>
        <AppHeader />
        <Container>
          <Search
            onClick={(obj) => this.setState({ determinedRetrospective: obj })}
          />
          <Result {...this.state.determinedRetrospective} />
          <SimpleZoom />
        </Container>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
