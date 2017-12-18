import React from 'react';
import { Meteor } from 'meteor/meteor';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';


export default (props) => {
    if (Meteor.user() !== null) {
        return (
            <div>
                <PrivateHeader title="Your Links"/>
                <div className="page-content">
                    <LinksListFilters/>
                    <AddLink/>
                    <LinksList/>
                </div>
            </div>
        );
    } else {
        props.history.replace('/');
    }
};