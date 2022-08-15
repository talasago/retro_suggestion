import React from "react";

import { Card, Box } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import retrospectiveSceneName from "../retrospectiveSceneName.json";

export default class SearchResult extends React.Component {
  render() {
    const scenes = this.props.scenes;
    const wayOfProceedings = this.props.wayOfProceeding;

    const displayScene =
      scenes === null || scenes === undefined
        ? null
        : scenes
            .map((val, _) => {
              //コードからふりかえりの使いやすい場面の名称変換
              return retrospectiveSceneName[String(val)];
            })
            .join("、");

    const displayWayOfProceedings =
      wayOfProceedings === null || wayOfProceedings === undefined
        ? null
        : wayOfProceedings.split("\n").map((val, idx) => {
            return <li key={idx}>{val}</li>;
          });

    //未選択時は非表示
    const title = this.props.title;
    if (title === null || title === undefined) {
      return null;
    }

    return (
      <Box>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              {this.props.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {displayScene}
            </Typography>
            <Typography variant="h5" component="div">
              進め方
            </Typography>
            <Typography
              variant="body2"
              style={{ whiteSpace: "pre-line" }}
              component={"div"}
            >
              <ul>{displayWayOfProceedings}</ul>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={this.props.reference} target="_blank">
              引用元リンク
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }
}
