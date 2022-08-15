import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppHeader from "./component/AppHeader";
import Search from "./component/Search";
import SearchResult from "./component/SearchResult";

import { Container } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      determinedRetrospective: {
        title: null,
        easyToUseScenes: null,
        wayOfProceeding: null,
        reference: null,
      },
    };
  }

  render() {
    return (
      <div>
        <AppHeader />
        <Container sx={{ mb: 1}}>
          <Search
            onClick={(obj) => this.setState({ determinedRetrospective: obj })}
          />
          <SearchResult {...this.state.determinedRetrospective} />
        </Container>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
