import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link  , useRouteMatch,
  useParams} from "react-router-dom";

export function ClientEditPage(){
	const params = useParams();
	return (
		<span>client edit page {JSON.stringify(params)}</span>
		)
}