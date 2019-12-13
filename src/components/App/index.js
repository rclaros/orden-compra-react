import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import {PopupboxContainer} from 'react-popupbox';

const App = () => (
  <React.Fragment>
    
    <main>
      <Filter />
      <PopupboxContainer />
      <Shelf />
    </main>
    <FloatCart />

  </React.Fragment>
);

export default App;
