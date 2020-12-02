import { Meteor } from 'meteor/meteor';
import { ClientsCollection } from '/imports/api/modules/clients';

import { CountriesCollection } from '/imports/api/modules/countries';


Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (ClientsCollection.find().count() === 0) {
    Meteor.call("clients.generateSeed", 1000);
  }


  //  if (CountriesCollection.find().count() === 0) {
  //  	const countries = require("./countries.json");

  //   Meteor.call("countries.load", countries);
  // }
});
