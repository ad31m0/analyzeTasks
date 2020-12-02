import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

import ButtonGroup from '@material-ui/core/ButtonGroup';


import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class DataTable extends React.Component {

  handleToggleActivate(event){
    
    console.log("toggleDeactivate");
    //setState({ ...state, [event.target.name]: event.target.checked });
  
  };

  state = {
    page: 0,
    count: 1,
    rowsPerPage: 5,
    sortOrder: {},
    data: [['Loading Data...']],
    columns: [
  
      {
        name: 'firstName',
        label: 'First Name',
        options: {},
      },
      {
        name: 'lastName',
        label: 'Last Name',
        options: {},
      },
       {
        name: 'email',
        label: 'Email',
        options: {},
      },
      {
        name: 'phone',
        label: 'Phone',
        options: {},
      },
      {
        name: 'street',
        label: 'Street',
        options: {},
      },
      {
        name: 'zipcode',
        label: 'Zipcode',
        options: {},
      },
      {
        name: 'city',
        label: 'City',
        options: {},
      },
       {
        name: 'country',
        label: 'Country',
        options: {},
      },

      {
        name: 'active',
        label: 'Active',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            // Here you can render a more complex display.
            // You're given access to tableMeta, which has
            // the rowData (as well as the original object data).
            // See the console for a detailed look at this object.

            console.log('customBodyRender');
            console.dir(tableMeta);
            return (
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={value}
                      onChange={this.handleToggleActivate.bind(this)}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Primary"
                />
              </FormGroup>)
          },
        },
      },


     


      {
        name: '_id',
        label: 'Actions',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            // Here you can render a more complex display.
            // You're given access to tableMeta, which has
            // the rowData (as well as the original object data).
            // See the console for a detailed look at this object.

            console.log('customBodyRender');
            console.dir(tableMeta);
            return (


                   <ButtonGroup >
              <Button component={Link} to={`/clients/edit/${value}`}>
              <EditIcon/>
            </Button>
              <Button component={Link} to={`/clients/view/${value}`}>
              <VisibilityIcon/>
            </Button>
            </ButtonGroup>
            )
          },
        },
      },
    ],
    isLoading: false,
  };

  componentDidMount() {
    this.getData('clients.paginate', 0);
  }

  // get data
  getData = async (url, page) => {
    this.setState({ isLoading: true });
    const res = await this.xhrRequest(url, page);
    this.setState({ data: res.data, isLoading: false, count: res.total });
  };

  getSrcData = () => {
    return [
    ];
  };

  sort = (page, sortOrder) => {
    this.setState({ isLoading: true });
    this.xhrRequest(`clients.paginate`, page, sortOrder).then(res => {
      this.setState({
        sortOrder,
        isLoading: false,
        data: res.data,
        page: res.page,
        count: res.total,
      });
    });
  };

  // mock async function
  xhrRequest = (url, page, sortOrder = {}) => {
    return new Promise((resolve, reject) => {
      // mock page data
      Meteor.call(url, {page, sortOrder, rowsPerPage: this.state.rowsPerPage}, (error, result)=>{
      const {data, total, page} = result;
	    resolve({
	          data,
	          total,
	          page,
	    });
      });
    });
  };

  changePage = (page, sortOrder) => {
    this.setState({
      isLoading: true,
    });
    this.xhrRequest(`clients.paginate`, page, sortOrder).then(res => {
      this.setState({
        sortOrder,
        isLoading: false,
        page: res.page,
        data: res.data,
        count: res.total,
      });
    });
  };

  render() {
    const { data, page, count, isLoading, rowsPerPage, sortOrder } = this.state;

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: true,
      count: count,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [],
      sortOrder: sortOrder,
      onTableChange: (action, tableState) => {
        console.log(action, tableState);

        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page, tableState.sortOrder);
            break;
          case 'sort':
            this.sort(tableState.page, tableState.sortOrder);
            break;
          default:
            console.log('action not handled.');
        }
      },
    };

    console.log('COLUMNS');
    console.dir(JSON.parse(JSON.stringify(this.state.columns)));

    return (
      <div>
        <MUIDataTable
          title={
            <Typography variant="h6">

              {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
          }
          data={data}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

export {DataTable};