import faker from "faker";

const RandomGenerator = {
	randomName(){
		return faker.name.firstName();
	},
	randomPhone(){
		return faker.phone.phoneNumber();
	},
	randomEmail(){
		return faker.internet.email();
	},
	randomStreet(){
		return faker.address.streetAddress();
	},
	randomZipCode(){
		return faker.address.zipCode();
	},
	randomCity(){
		return faker.address.city();
	},
	randomCountry(){
		return faker.address.country();
	}
}

export {RandomGenerator};