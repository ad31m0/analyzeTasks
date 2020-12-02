import { Mongo } from 'meteor/mongo';


export const CountriesCollection = new Mongo.Collection('countries');

if(Meteor.isServer){
	Meteor.methods({
		"countries.load"(countries){
			Object.keys(countries).forEach((country)=>{
				CountriesCollection.insert({country, name: country});
				console.log("inserted, ", country)
				Meteor.call("cities.load", country, countries[country]);
			})
		}
	})
}