import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Landingpage from './landingPage/Landingpage';
import Postview from './Postpage/Postview';
import Form from './form/Form';
function App() {
  return (
<>
<BrowserRouter>
<Routes>
<Route exact path="/" element={<Landingpage/>}></Route>
<Route path="/postview" element={<Postview/>}></Route>
<Route path="/form" element={<Form/>}></Route>
</Routes>
</BrowserRouter>
</>
  )
}

export default App
