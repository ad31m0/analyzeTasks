import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link  , useRouteMatch,
  useParams} from "react-router-dom";

export function ClientViewPage(){
	const params = useParams();
	return (
		<span>client view page {JSON.stringify(params)}</span>
		)
}