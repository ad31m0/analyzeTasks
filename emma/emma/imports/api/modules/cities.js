import { Mongo } from 'meteor/mongo';


export const CitiesCollection = new Mongo.Collection('cities');

if(Meteor.isServer){
	Meteor.methods({
		"cities.load"(country, cities){
			cities.forEach((city)=>{
				CountriesCollection.insert({country, city, name: city});
				console.log("inserted, ", country, city)
			})
		}
	})