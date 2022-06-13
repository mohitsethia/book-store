import React from 'react';
import './style.css';
// import {useEffect,useState} from 'react';

const Dashboard = () => {
   
//    const[record,setRecord] = useState([])
 
//    const getData = () =>
//    {
//        fetch('https://jsonplaceholder.typicode.com/users')
//        .then(resposne=> resposne.json())
//        .then(res=>setRecord(res))
//    }
 
//    useEffect(() => {
//       getData();
//    },)
    
 
    return (
    <div class="col main pt-5 mt-3">
        <div class="row mb-3">
            <h1>Admin Dashboard</h1>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card bg-success text-white h-100">
                    <a class='dash' href="/Admin">
                        <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                            <div class="rotate">
                                <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Users</h6>
                            {/* <h1 class="display-4">134</h1> */}
                        </div>
                    </a>
                    
                    
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <a class="dash" href="#">
                    <div class="card text-white bg-danger h-100">
                        <div class="card-body bg-danger">
                            <div class="rotate">
                                <i class="fa fa-list fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Orders</h6>
                            {/* <h1 class="display-4">87</h1> */}
                        </div>
                    </div>
                </a>
                
            </div>
        </div>
    </div>
    )
}
 
export default Dashboard;