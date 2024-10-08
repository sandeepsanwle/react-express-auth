import React from "react";
import { TextField, Button } from "@material-ui/core";
import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/authService";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const OnSubmit = (data) => {
    createUser(data)
      .then((res) => {
        console.log("res",res);
        
        if(res.data.status === 201){
            Swal.fire({
                icon: "success",
                title: "Done",
                text: `User created successfully`,
                confirmButtonText: "Login",
              }).then((result)=>{
                if (result.isConfirmed) {
                    navigate("/login")
                  } 
              });
         }
      })
      .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${err.response.data.message}`,
              });
      });
  };

  return (
    <div className="container">
      <form className="registerForm" onSubmit={handleSubmit(OnSubmit)}>
        <TextField
          {...register("name", { required: true, minLength: 3 })}
          label="Name"
          variant="filled"
          className={errors.name ? "error" : ""}
        />
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Create Account
        </Button>
        <h3>Already have an account?</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Register;
