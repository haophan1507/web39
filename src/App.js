import React from 'react';
import {Route} from "react-router-dom"
import { Auth } from "./screens/auth/Auth"

const App = () => {
  return (
    <div>
      <Route path="/auth" component={Auth}/>
    </div>
  );
}

export default App;
