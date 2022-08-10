import React from "react";

import {Card, Box} from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import retrospectivePurposeName from "../retrospective_purpose_name.json";

export default class SearchResult extends React.Component {
  render() {
    const purposes = this.props.purposes;
    const displayPurposes =
      purposes === null || purposes === undefined
        ? null
        : purposes.map((val, idx) => {
            //コードからふりかえり目的の名称変換
            return <li key={idx}>{retrospectivePurposeName[String(val)]}</li>;
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
            <Typography variant="h5" component="div">
              {this.props.title}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <ul>{displayPurposes}</ul>
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
