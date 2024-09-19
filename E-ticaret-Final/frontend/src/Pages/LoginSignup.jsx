import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({username:"",email:"",password:""});

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    }

  const login = async () => {
    
    if (!formData.email || !formData.password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    let dataObj;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});
      console.log(dataObj);
      if (dataObj.success) {
        localStorage.setItem('auth-token',dataObj.token);
        window.location.replace("/");
      }
      else
      {
        alert(dataObj.errors)
      }
  }

  const signup = async () => {
    
    if (!formData.username || !formData.email || !formData.password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    let dataObj;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});

      if (dataObj.success) {
        localStorage.setItem('auth-token',dataObj.token);
        window.location.replace("/");
      }
      else
      {
        alert(dataObj.errors)
      }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" placeholder="Adınız" name="username" value={formData.username} onChange={changeHandler}/>:<></>}
          <input type="email" placeholder="Email Adresiniz" name="email" value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder="Şifreniz" name="password" value={formData.password} onChange={changeHandler}/>
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}>Devam</button>

        {state==="Login"?
        <p className="loginsignup-login">Hesap Oluşturmak İçin, <span onClick={()=>{setState("Sign Up")}}>Buraya Tıklayın</span></p>
        :<p className="loginsignup-login">Zaten Hesabınız Var ise, <span onClick={()=>{setState("Login")}}>Buraya Tıklayın</span></p>}
      </div>
    </div>
  );
};

export default LoginSignup;
