
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Menu from './pages/LogUserName';
import User from './pages/User';
import Match from './pages/Match';

export default function Routes(){

    return(
        <BrowserRouter> 
            <Switch>

                <Route path="/" exact component={Menu}/>
                <Route path="/User" component={User}/>
                <Route path="/Match" component={Match}/>


            </Switch>
            
        </BrowserRouter>

    )
}