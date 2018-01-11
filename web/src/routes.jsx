import * as React from 'react';
import { Route } from 'react-router';

import MainPage from 'components/MainPage'

export default (
  <div>
    <Route path="/" component={MainPage}/>
  </div>
);