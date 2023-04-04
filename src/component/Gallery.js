import React, { useEffect, useState } from 'react'
import home from "./home.png"
import axios from 'axios';
import "./gallery.css";

function Gallery() {
    const [data, setData] = useState();
    const [modal, setModal] = useState(false);
    const [addmodal, setAddmodal] = useState(false);
    const [showdata, setShowdata] = useState(false);
    const [text, setText] = useState();
    const [srdata, setSrdata] = useState();
    const [updata, setUpdata] = useState({
        label:null,
        imageurl:null
    })
    const [id, setId] = useState();

    useEffect(()=>{
        getData()
    },[])

    const getData = async ()=>{
        await axios.get("http://localhost:5000/")
        .then((res)=>{
            if(res.status === 200){
                setData(res.data)
                setShowdata(true);
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

    const showModal = ()=>{
        setModal(!modal);
    }

    const showModal2 = ()=>{
        setAddmodal(!addmodal)
    }

    const deleteImg = async()=>{
        console.log(id);
        await axios.delete(`http://localhost:5000/delpost/${id}`)
        .then((res)=>{
            if(res.data.status == "successfull"){
                alert("Image deleted")
                getData()
                showModal();
            }
        })
    }

    const postImg = async()=>{
        if(updata.imageurl && updata.label){
        await axios.post("http://localhost:5000/post",{
                label:updata.label,
                imageurl:updata.imageurl
            }
        )
        .then((res)=>{
            if(res.data.status == "successfull"){
                getData();
                showModal2();
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    } else{
        alert("Fill all details")
    }
    }

    const handleSearch = async ()=>{
        await axios.get(`http://localhost:5000/search/${text}`)
        .then((res)=>{
            if(res.data.status == "successfull"){
                setSrdata(res.data)
                setShowdata(false);
            } else {
                alert(res.data.status)
            }
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }

  return (
    <div className='homebox'>
        <h1 className='heading'>Image Gallery</h1>
        <div className='navbar'>
            <div>
            <span className='logotext'>
                <img className='logo' src={home} alt=""/>My Unsplash
            </span>
            <span>
                <input className='searchbox' type={"text"} placeholder="search by name" onChange={(e)=>{setText(e.target.value)}}/>
                <button className='searchbtn' onClick={handleSearch}>Search</button>
            </span>
            </div>
            <div>
                <button className='addbtn' onClick={showModal2}>Add a photo</button>
            </div>
        </div>
        <div className='gridbox'>
            {showdata && data.photos.map((items,{id=items._id})=>{
                return(
                    <div className='imgBox' key={id}>
                        <button onClick={()=>{showModal();setId(id)}} className='btn'>delete</button>
                        <img className='img' src={items.imageurl} alt=''/>
                        <p className='para'>{items.label}</p>
                    </div>
                )
            })}
            {modal && 
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='modal-content'>
                        <h2>Alert</h2>
                        <p>Are you sure, you want to delete this image</p>
                        <div>
                        <button onClick={()=>{showModal();getData()}}>No</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={deleteImg}>Yes</button>
                        </div>
                    </div>
                </div>}
            {addmodal && 
            <div className='modal'>
                <div className='overlay'></div>
                <div className='modal-content'>
                    <h2>Add a new Photo</h2>
                    <label>Label</label> 
                    <input type={"text"} placeholder="Fruit basket" onChange={(e)=>setUpdata({...updata,label:e.target.value})}/>
                        <label>Photo URL</label>
                        <input type={"text"} placeholder="https://images.upload.com/12356789......" onChange={(e)=>setUpdata({...updata,imageurl:e.target.value})}/>
                    <div>
                    <button onClick={showModal2}>Close</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={postImg}>Post</button>
                    </div>
                </div>
            </div>}
            {srdata && <button onClick={()=>{setSrdata();getData()}}>Home Page</button>}
            {srdata && srdata.result.map((items,{id=items._id})=>{
                return(
                    <div className='imgBox' key={id}>
                        <button onClick={()=>{showModal();setId(id);setSrdata()}} className='btn'>delete</button>
                        <img className='img' src={items.imageurl} alt=''/>
                        <p className='para'>{items.label}</p>
                    </div>
                )
            })}
            {srdata && srdata.result.length === 0 && <h2>No image found with following label</h2>}
        </div>
    </div>
  )
}

export default Gallery