import React, {useEffect, useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
// export default function Home() {
  const Home=()=>{

    const [users,setUsers]=useState([])

    useEffect(() => {
        loadUsers();
       // console.log("code with arjun");
    },[]);
    
   

    const loadUsers= async ()=>{
        const result=await axios.get("http://localhost:9090/library/getAll")
        setUsers(result.data.result.books);
        //console.log('result',result.data.result.books);
    };

    return (
    <div className='container' style={{textAlign:'center'}}>
            <h1 style={{ color: 'red' }}>Home Page</h1>
        <div className='py-4'>

        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Index Number</th>
      <th scope="col">Name</th>
      <th scope="col">Title</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

{
    users.map((user,index)=>(
        <tr key={user.id}>
              <th scope="row">{index + 1}</th>
        <td>{user.indexNumber}</td>
        <td>{user.name}</td>
        <td>{user.title}</td>
        <td>
        <td >
        <Link to={`/viewUser/${user.id}`}><button className='btn btn-primary mx-2' >View</button></Link>

        <Link to={`/editUser/${user.id}`}><button className="btn btn-outline-primary mx-2" >Edit</button></Link>
            
           < Link to={`/delete/${user.id}`}><button className="btn btn-danger mx-2" >Delete</button></Link>
            
        </td>
        </td>
        </tr>
    ))
}

  </tbody>
</table>

        </div>
    </div>
  )
}
export default Home
