import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import ErrorMessage from "../../components/ErrorMessage"; // Ensure this import is correct
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../components/actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://robohash.org/mail@ashallendesign.co.uk"
  );
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState(""); // Fix typo here
const navigate=useNavigate();
const dispatch=useDispatch();
 const userRegister=useSelector(state=>state.register);
 const{loading,error,userInfo}=userRegister;
 useEffect(()=>{
  if(userInfo){
    navigate("/mynotes");
  }
 },[navigate,userInfo])
  const submitHandler = async (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
      setMessage("Password Do Not Match")
    }else{
      dispatch(register(name,email,password,pic));
    }
  }
   

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dc2llvvy8");
      fetch("https://api.cloudinary.com/v1_1/dc2llvvy8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Loading...</div>}

      <Form onSubmit={submitHandler} encType="multipart/form-data">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {picMessage && (
          <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
        )}

        <Form.Group controlId="profilePic" className="mt-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            label="Upload Profile Picture"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-4"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account?{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Login Here
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
