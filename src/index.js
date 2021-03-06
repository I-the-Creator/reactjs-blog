import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
       <Routes basename={process.env.PUBLIC_URL}>
        <Route path="blog_app/*" element={<App />} /> {/* use "/*" as we have another routes inside */}
       </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

