'use strict';
import Realm from 'realm';
import schema from './schema';

let realm = new Realm({
    schema
});

module.exports = realm;