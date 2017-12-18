import { Meteor } from 'meteor/meteor';     // Named export
import ReactDOM from 'react-dom';           // Default export
import { Tracker } from 'meteor/tracker'; 
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
    // Store users authenticated status.
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);    
}); 

Meteor.startup(() => {
    Session.set('showVisible', true);
    ReactDOM.render(routes, document.getElementById('app'));
});