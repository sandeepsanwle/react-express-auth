import axios from "axios";

export const userLogin = (userData) => {
  return axios({
    method: "post",
    url: `http://localhost:5000/user/login`,
    data: userData,
    responseType: "json",
  });
};

export const createUser = (userData) => {
   return axios({
        method: "post",
        url: `http://localhost:5000/user/create`,
        data: userData,
        responseType: "json",
    });
};

// export const userLogout = () => {
//   const accessToken = window.localStorage.getItem("accessToken");
//   return axios({
//     method: "post",
//     url: process.env.REACT_APP_SERVER_API + "api/logout/",
//     headers: {
//       Authorization: `Token ${accessToken}`,
//       "Content-Type": "application/json", // Set content type if required by your API
//     },
//     responseType: "json",
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         //   alert("from logout");
//         //   console.log(res);
//         //   window.localStorage.removeItem('accessToken');
//         //   window.localStorage.removeItem('revelera_user');
//         //   window.location.href = '/';
//       }
//     })
//     .finally(() => {
//       window.localStorage.removeItem("accessToken");
//       window.localStorage.removeItem("revelera_user");
//       window.location.href = "/";
//     });
// };


// export const changePassword = (postData) => {
//   const accessToken = window.localStorage.getItem("accessToken");
//   return axios({
//     method: "post",
//     url: process.env.REACT_APP_SERVER_API + "api/change-password/",
//     headers: {
//       Authorization: `Token ${accessToken}`,
//       "Content-Type": "application/json", // Set content type if required by your API
//     },
//     data: {
//       uname: postData.uname,
//       password: postData.password,
//     },
//     responseType: "json",
//   });
// };

// export const resetPassword = ({ email, otp, password }) => {
//   return axios({
//     method: "post",
//     url: `${process.env.REACT_APP_SERVER_API}api/verify-otp/`,
//     data: { email, otp, password },
//     responseType: "json",
//   });
// };
