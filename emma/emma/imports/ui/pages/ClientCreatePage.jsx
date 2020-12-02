import React from 'react';
import { useForm, Controller } from "react-hook-form";
import MaterialUIInput from "@material-ui/core/Input";

import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Redirect } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';


import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

import {ClientsSchema} from "/imports/api/modules/clients";

import Switch from '@material-ui/core/Switch';



function TextInputControlled({errors, control, name, label}){
	return (
    <FormControl fullWidth={true} error={errors[name] ? true : false}>
      <InputLabel >{label}</InputLabel>
      <Controller 
        control={control}
        name={name}
        defaultValue=""
        as={Input}
      />
      <FormHelperText > {errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}


export function ClientCreatePage(){

  const [redirect, setRedirect] = React.useState(false);
  
  const { control, handleSubmit, errors, register } = useForm({
    resolver: yupResolver(ClientsSchema)
  });

  const onSubmit = data => {
    console.log("clients.create", data)
    Meteor.call("clients.create", data, (error, result)=>{
      console.log(result, error)
      if(result){
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to={"/clients"} />
  }

	return (
		<form id="clientCreateForm" onSubmit={handleSubmit(onSubmit)}>

        <TextInputControlled  name="firstName" label={"First Name"} control={control} errors={errors}/>
        <TextInputControlled  name="lastName" label={"Last Name"} control={control} errors={errors}/>
        <TextInputControlled  name="email" label={"Email"} control={control} errors={errors}/>
        <TextInputControlled name="phone" label={"Phone"} control={control} errors={errors}/>
        <TextInputControlled name="street" label={"Street Address"} control={control} errors={errors}/>
        <TextInputControlled name="zipcode" label={"Zipcode"} control={control} errors={errors}/>
        <TextInputControlled name="city" label={"City"} control={control} errors={errors}/>
        
        <TextInputControlled name="country" label={"Country"} control={control} errors={errors}/>
        
        
        <FormControlLabel
          control={<Switch inputRef={register} name="active" />}
          label="Active?" 
        />

        <Fab  aria-label="create" color="secondary" onClick={handleSubmit(onSubmit)} style={{ position: 'fixed', bottom: "1rem", right: "1rem"}}>
          <SaveIcon />
        </Fab>
    </form>
	)
}
