import React, { useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import Addtraining from "./Addtraining";
import moment from 'moment';


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
   
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const newCustomer = (newData) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newData)
        })
    }

    const deleteCustomer = (oldData) => {
        fetch(oldData.href, {method: 'DELETE'})
        .catch(err => console.error(err))
    }

    const updateCustomer = (newData, oldData) => {
        fetch(oldData.href, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newData)
        })
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


    return (
        <div>
        <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      <MaterialTable
        title="Customers"
        columns={[
            { render: row => {
                return ( <div style={{width: 110}}> <Addtraining newTraining={newTraining} link={row.links} />
            </div>)}},
            { title: 'First name', field: 'firstname', },
            { title: 'Last Name', field: 'lastname' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone'},
            { title: 'Address', field: 'streetaddress' },
            { title: 'Postcode', field: 'postcode' },
            { title: 'City', field: 'city' },
            
        ]}
        data={customers}

        editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setCustomers([...customers, newData]);
                    newCustomer(newData);
                    resolve();
                }, 1000)
            }),
            onRowUpdate: (newData, oldData) => 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const dataUpdate = [...customers];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setCustomers([...dataUpdate]);
                    updateCustomer(newData, oldData.links[1]);

                    resolve();
                }, 1000)
            }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const dataDelete = [...customers];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setCustomers([...dataDelete]);
                    deleteCustomer(oldData.links[1]);

                resolve()
                }, 1000)
            }),
        }}
                
      />
      </div>
    )
  }