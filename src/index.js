import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './component/AppHeader';
import { Container } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';


import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

class Search extends React.Component {
  render() {
    return (
      <>
      <div>
        <SearchCheckBoxs />
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

class SearchCheckBoxs extends React.Component {
  //チェックボックスの内容の状態をもつ
  //TODO:目的をmapとかにする。
  //クラスに複数形はだめかなあ

  render() {
    return (
        <FormControl component="fieldset">
        <FormLabel component="legend">ふりかえり目的</FormLabel>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Checkbox />}
            label="目的1"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="目的2"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="目的3"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="目的4"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="目的5"
            labelPlacement="start"
          />
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
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
