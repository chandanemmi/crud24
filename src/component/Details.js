import React, { useEffect, useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import { CardContent } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function Details() {
  const navigate = useNavigate();

  const {id}=useParams("")
  const [userData,setUserData]=useState([])

  const getUserData=async()=>{
    console.log(`/getuser/${id}`)
    const res=await fetch(`https://crud24.herokuapp.com/getuser/${id}`,{
                method:"GET",
                header:{
                  "Content-Type": "application/json"}}
                  )
     const data=await res.json();  
     if(res.status===422||!data){
      alert("error") 
     } else{
      setUserData(data)
      console.log(data)
     }          
  }

  useEffect(()=>{
    getUserData()
  },[])

  const DeleteUSer=async(id)=>{
    const res=await fetch(`https://crud24.herokuapp.com/deleteuser/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
  
    })

    const deletedata=await res.json();
    if(res.status===422||!deletedata){
      alert("error delete")
    }else{
        alert("DEleted")
        // getDara()
        navigate("/")


    }
}
  return (
    <div className='container mt-3'>
        <h1 style={{fontWeight:400}}> Welcome to Heaven</h1>
        <Card sx={{ maxWidth: 455 }} style={{border:"1px solid red"}}>
      <CardContent>
        {userData !=="null"||"undefind"?<> <div className='row'>
        <div className='left_view col-lg-6 col-md-6 col-12'>
        <img src='./profile.png' style={{width:50}} alt="profile"/>
        <h3>Name:<span style={{fontWeight:400}}> {userData.name}</span></h3>
        <h3>Age:<span style={{fontWeight:400}}>{userData.age}</span></h3>
        <h3>Phone:<span style={{fontWeight:400}}>{userData.mobile}</span></h3>
        <p><MailOutlineIcon/>Email:<span>{userData.email}</span></p>
        <p><WorkIcon/>Occupation:<span>{userData.work}</span></p>
        </div>
        <div className='right_view col-lg-6 col-md-6 col-12'>
    
          <div className='add-btn'>
        <NavLink to={`/Edit/${userData._id}`}><button className='btn btn-primary mb-2'> <CreateIcon/></button></NavLink>
        <button className='btn btn-danger mb-2'  onClick={()=>DeleteUSer(userData._id)}> <DeleteOutlineIcon/></button>
    </div>    
          <p><StayCurrentPortraitIcon/>Mobile:<span>{userData.mobile}</span></p>
          <p><LocationOnIcon/>Location:<span>{userData.address}</span></p>
          <p>Description:<span>{userData.Description}</span></p>
        </div>
        </div></>:<>No data</>}
       
        </CardContent>
        </Card>
    </div>
  )
}
