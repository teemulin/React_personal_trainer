import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Editcustomer from './Editcustomer';
import Addcustomer from "./Addcustomer";
import DeleteIcon from '@material-ui/icons/Delete';
import Addtraining from "./Addtraining";
import moment from 'moment';
import MaterialTable from 'material-table';


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
   
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const newCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const newTraining = (training) => {
        training.date = moment(training.date, "DD-MM-YYYY").format("YYYY-MM-DD");
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }


    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            sortable: false,
        },
        {
            filterable: false,
            sortable: false,
            width: 50,
            accessor: 'links.0.href',
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customer={row.original} />
        },
        {
            filterable: false,
            sortable: false,
            width: 50,
            accessor: 'links.0.href',
            Cell: row => <Button color="secondary" size="small" onClick={() => deleteCustomer(row.value)} ><DeleteIcon fontSize="small"/></Button>
        },
        {
            filterable: false,
            sortable: false,
            width: 120,
            Cell: row => <Addtraining newTraining={newTraining} link={row.original.links} /> 
        },
    ]

    return (
        <div>
            <Addcustomer newCustomer={newCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
}