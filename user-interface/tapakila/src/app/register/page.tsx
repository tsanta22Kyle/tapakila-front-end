"use client";
import "./signUp.css"
import 'boxicons'

export default function Registration() {
  

  return (
    <>
    <div className="container">
      <div className="form-box register">
        <form action="">
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bsx-lock-alt"></i>
          </div>
          <div className="forgot-link">
            <a href="#">besoin de créer un compte?</a>
          </div>
          <button type="submit" className="btn">Register</button>
          <p>ou s'enregistrer avec</p>
          <div className="social-icons">
            <a href="" className="bx bxl-google"></a>
            <a href="" className="bx bxl-facebook"></a>
          </div>
        </form>
      </div>

    <div className="toggle-box">
      <div className="toggle-panel toggle-left">
        <h2>Hello, Welcome to tapakila!</h2>
        <p>Don't have an account?Click on "besoin de créer un compte"</p>
      </div>
    </div>
    </div>

    
     

    
    </>
  );
}
