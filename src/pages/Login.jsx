import React from "react";
import { TextField, Button } from "@material-ui/core";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../services/authService";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const OnSubmit = async (data) => {
    userLogin(data)
    .then((res)=>{
        if(res.data.status === 200){
            let response = res.data.data;
            let token = response.token.split(' ')[1];
            if(token){
                localStorage.setItem('token',token);
                localStorage.setItem('userName',response.userName);
                localStorage.setItem('email',response.email);
                navigate("/dashboard")
            }
         }
    })
    .catch((err) => {
        if(err.response.data.status === 400){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.response.data.message}`,
              });
         }
    })
  };

  return (
    <div className="container">
      <form className="loginForm" onSubmit={handleSubmit(OnSubmit)}>
        <TextField
          {...register("email", { required: true })}
          label="Email"
          variant="filled"
          className={errors.email ? "error" : ""}
        />
        <TextField
          {...register("password", { required: true })}
          label="Password"
          variant="filled"
          className={errors.password ? "error" : ""}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Login;
