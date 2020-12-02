import { Mongo } from 'meteor/mongo';
import * as yup from "yup";
import { Redirect } from "react-router-dom";


import {RandomGenerator} from "/imports/api/helpers/randomGenerator";
import regex from "/imports/api/helpers/regex";

export const ClientsCollection = new Mongo.Collection('clients');

export const ClientsSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().required().email().label("Email"),
  phone:  yup.string().matches(regex.phone, 'Phone number is not valid').label("Phone"),
  street: yup.string().label("Street"),
  zipcode: yup.string().matches(regex.zipcode, "Zipcode is not valid").label("Zipcode"),  
  city: yup.string().label("City"),
  country: yup.string().label("Country"),
  active: yup.boolean().label("Active")

});


if(Meteor.isServer){
	Meteor.methods({
		"clients.removeAll"(){
			ClientsCollection.remove({});
		},
		"clients.create"(client){
			const result = ClientsCollection.insert(client);
			return result;
		},
		"clients.paginate"({page, sortOrder, rowsPerPage}){
			
			let result = {
				data: ClientsCollection.find({}, {limit: rowsPerPage, skip: page*rowsPerPage, sort: {[sortOrder.name]: sortOrder.direction == "asc" ? 1 : -1}}).fetch(),
				page: page,
				total:  ClientsCollection.find({}).count()
			}

			console.log("result", result);
			return result;
		},
		"clients.generateSeed"({n=1000}){
			for(let i=0; i<n; i++){
				let client = {
					firstName: RandomGenerator.randomName(),
					lastName: RandomGenerator.randomName(),
					phone: RandomGenerator.randomPhone(),
					email: RandomGenerator.randomEmail(),
					street: RandomGenerator.randomStreet(),
					zipcode: RandomGenerator.randomZipCode(),
					city: RandomGenerator.randomCity(),
					country: RandomGenerator.randomCountry(),
				}
				console.log("client", client)
				ClientsCollection.insert(client);
			}
		}
	})
}