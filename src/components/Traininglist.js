import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if(window.confirm('Are you sure?')) {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${link}`, {
            method: 'DELETE'
        })
        .then(response => fetchData())
        .catch(err=>console.error(err))
        }
    }
    
    const columns = [
        {
            width: 50,
            sortable: false,
            filterable: false,
            Cell: row => <Button color="secondary" size="small" onClick={() => deleteTraining(row.original.id)} ><DeleteIcon/></Button>
        },
        {
            Header: 'Customer',
            width: 200,
            Cell: row => row.original.customer.firstname + " " + row.original.customer.lastname
        },
        {
            Header: 'Activity',
            accessor: 'activity',
            width: 200  
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => moment(row.value).format('DD-MM-YYYY'),
            width: 150
        },
        {
            Header: 'Duration',
            accessor: 'duration',
            filterable: false,
            width: 100
        },
                      
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
    
}

//<Button color="primary" size="small" onClick={() => customer(row.original.customer)} >Customer</Button>