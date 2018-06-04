
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Profile from './components/Home/Profile.js';
import NumberChanger from './components/Home/NumberChanger.js';


export default (
    <Switch>
        
        <Route component={ Profile } path='/' exact />
        <Route component={ NumberChanger } path='/number' exact />

    </Switch>
)
