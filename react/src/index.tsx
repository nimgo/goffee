import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from "./components/Hello";

const title: string = '...';

ReactDOM.render(
  <div>
    <Hello compiler={title} framework="React" />
    <span>root</span>
  </div>
  ,
  document.getElementById('app')
);
