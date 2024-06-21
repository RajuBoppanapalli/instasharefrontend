import axios from "axios";
import{ useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getLocalStorageItem } from "../../services/storage/local.storage";
import "../addpost/addpost.component.css"
import { useNavigate } from "react-router-dom";
import { NavBar } from "../navbar/navbar.component";

export function AddPost() {
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
    formData.append('caption', data.caption);
    formData.append('customid', userData[0]?.id);
    formData.append('image', postimg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.post("http://localhost:4002/addposts", formData, config);
      navigate("/sharefields")
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
      <div className="adding-main" >
        <div className="addingpost">
          <form onSubmit={handleSubmit((data) => { saveData(data) })}>
            <label> Upload Image:</label>
            <input 
              type="file"
              id="image"
              name="image"
              {...register('image')}
              onChange={(event) => { loadImage(event) }}
              required
            />
            <label>Image Caption:</label>
            <input
              type="text"
              id="caption"
              name="caption"
              {...register('caption')}
            />
            <Button type="submit" >Post</Button>
          </form>
        </div>
      </div>
    </>
  );
}
