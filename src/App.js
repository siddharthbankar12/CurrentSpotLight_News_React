import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const country = "us";
  const pageSize = 6;
  const apiKey = "821f638ceaff4a6e97347cc700b93b4f";
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />

        <LoadingBar height={3} color='#f11946' progress={progress} />

        <Routes>
          <Route
            exact
            path='/'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='general'
                pageSize={pageSize}
                country={country}
                category='general'
              />
            }
          />
          <Route
            exact
            path='/business'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='business'
                pageSize={pageSize}
                country={country}
                category='business'
              />
            }
          />
          <Route
            exact
            path='/entertainment'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='entertainment'
                pageSize={pageSize}
                country={country}
                category='entertainment'
              />
            }
          />
          <Route
            exact
            path='/general'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='general'
                pageSize={pageSize}
                country={country}
                category='general'
              />
            }
          />
          <Route
            exact
            path='/health'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='health'
                pageSize={pageSize}
                country={country}
                category='health'
              />
            }
          />
          <Route
            exact
            path='/science'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='science'
                pageSize={pageSize}
                country={country}
                category='science'
              />
            }
          />
          <Route
            exact
            path='/sports'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='sports'
                pageSize={pageSize}
                country={country}
                category='sports'
              />
            }
          />
          <Route
            exact
            path='/technology'
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key='technology'
                pageSize={pageSize}
                country={country}
                category='technology'
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
