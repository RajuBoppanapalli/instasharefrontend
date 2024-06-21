import React from 'react'
import axios from "axios";
import{ useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getLocalStorageItem } from "../../services/storage/local.storage";
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../navbar/navbar.component';
export default function AddProfile() {
    const [userData, setUserData] = useState(null);
    const [postimg, setpostimg] = useState(null);
    const { register, handleSubmit } = useForm();
    const navigate=useNavigate();
  
    useEffect(() => {
      const data = getLocalStorageItem("userdata");
      setUserData(JSON.parse(data));
    }, []);
  
    async function saveData(data) {
      const formData = new FormData();
      formData.append('custid', userData[0]?.id);
      formData.append('profileimg', postimg);
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
  
      try {
        const res = await axios.post("http://localhost:4002/addprofile", formData, config);
        navigate("/userprofile")
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  
    function loadImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        setpostimg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  return (
    <>
    <NavBar></NavBar>
      <div>
        <div  className="addingpost">
          <form onSubmit={handleSubmit((data) => { saveData(data) })}>
            <label>Upload Profile:</label>
            <input 
              type="file"
              id="profileimg"
              name="profileimg"
              {...register('profileimg')}
              onChange={(event) => { loadImage(event) }}
              required
            />
            <Button type="submit">Post</Button>
          </form>
        </div>
      </div>
    </>
  )
}
