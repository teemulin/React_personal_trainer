import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (oldData) => {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${oldData.id}`, {
            method: 'DELETE'
        })
        .catch(err => console.error(err))
    }
    
    const columns = [
        { title: 'Customer', render: rowData => rowData.customer.firstname + " " + rowData.customer.lastname,
            customFilterAndSearch: (term, rowData) => (rowData.customer.firstname + " " + rowData.customer.lastname).indexOf(term) != -1 },    
        { title: 'Activity', field: 'activity' },
        { title: 'Date', render: row => { return ( moment(row.value).format('DD.MM.YYYY') ) }},
        { title: 'Duration', field: 'duration' },                              
    ]

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <MaterialTable 
                title="Trainings"
                columns={columns}
                data={trainings}

                editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                            const dataDelete = [...trainings];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setTrainings([...dataDelete]);
                            deleteTraining(oldData);

                            resolve()
                            }, 1000)
                        }),
                }}
            />
        </div>
    );
    
}