import './App.css';
import { withRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Detail from "./Detail";
import Calen from "./Calen";
import React from "react";
import NotFound from "./NotFound";
import Schedule from "./Schedule";
import New from "./New";
import styled from 'styled-components';
// import MainContent from "./MainContent"
// import { firestore } from "./firebase";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <Calen/> */}
        <Switch>
          <AppFrame>
          <Route path="/" exact component={Calen} />
          <Route path="/detail/:index" component={Detail} />
          <Route path="/schedule/:index" component={Schedule} />
          <Route path="/new" component={New} />
          {/* <Route component={NotFound} /> */}
          </AppFrame>
        </Switch>        
      </div>
    );
  }
}
const AppFrame = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.5); */
    align-items:center;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
`

// const CalendarBody = styled.

export default withRouter(App);