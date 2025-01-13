// import {
//   MDBBtn,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow
// } from 'mdb-react-ui-kit';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { loginUserApi } from '../../apis/Api';

// function Login() {
//   // useState for each input
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

//   // Error state
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   // useNavigate hook for navigation
//   const navigate = useNavigate();

//   // Validation function
//   const validation = () => {
//     let isValid = true;

//     if (email.trim() === '' || !email.includes('@')) {
//       setEmailError('Email is empty or invalid');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     if (password.trim() === '') {
//       setPasswordError('Password is empty');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     return isValid;
//   };

//   // Handle form submission
//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!validation()) {
//       return;
//     }

//     // JSON object
//     const data = {
//       email: email,
//       password: password,
//     };

//     // API request
//     loginUserApi(data).then((res) => {
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);

//         // Setting token and user data in local storage
//         localStorage.setItem('token', res.data.token);

//         // Converting user data to JSON and setting it in local storage
//         const convertedData = JSON.stringify(res.data.userData);
//         localStorage.setItem('user', convertedData);

//         // Redirect to the root page
//         navigate('/');
//       }
//     });
//   };

//   return (
//     <MDBContainer fluid>
//       <MDBRow>
//         <MDBCol sm="6">
//           <div className="d-flex flex-row ps-5 pt-5">
//             <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
//             <span className="h1 fw-bold mb-0">Maestro</span>
//           </div>

//           <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
//             <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

//             <MDBInput
//               wrapperClass="mb-4 mx-5 w-100"
//               label="Email address"
//               id="formControlLg"
//               type="email"
//               size="lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {emailError && <p className="text-danger ms-5">{emailError}</p>}

//             <div className="password-toggle mx-5 w-100 position-relative">
//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Password"
//                 id="formControlLg"
//                 type={showPassword ? "text" : "password"}
//                 size="lg"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle-text"
//                 style={{
//                   position: 'absolute',
//                   top: '22%',
//                   right: '20px',
//                   cursor: 'pointer',
//                   transform: 'translateY(-50%)',
//                   fontSize: '1rem',
//                   color: '#007bff'
//                 }}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </span>
//             </div>

//             {passwordError && <p className="text-danger ms-5">{passwordError}</p>}
//             <p className="small mb-5 pb-lg-3 ms-5">
//               <Link to={'/forgot_password'} href="#!" className="text-muted">Forgot password</Link>
//             </p>

//             <MDBBtn
//               className="mb-4 px-5 mx-5 w-100"
//               color="info"
//               size="lg"
//               onClick={handleLogin}
//             >
//               Login
//             </MDBBtn>

//             <p className="medium mb-5 ms-5">Don't have an account?
//               <Link to={'/register'} href="#!" style={{ color: '#393f81' }}> Register here</Link>
//             </p>
//           </div>
//         </MDBCol>

//         <MDBCol sm="6" className="d-none d-sm-block px-0">
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
//             alt="Login image"
//             className="rounded-start w-100"
//             style={{ objectFit: 'cover', objectPosition: 'left' }}
//           />
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default Login;




import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';

function Login() {
  // useState for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Error state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Validation function
  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Validation
    if (!validation()) {
      return;
    }

    // JSON object
    const data = {
      email: email,
      password: password,
    };

    // API request
    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        // Setting token and user data in local storage
        localStorage.setItem('token', res.data.token);

        // Converting user data to JSON and setting it in local storage
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem('user', convertedData);

        // Redirect to the root page
        navigate('/');
      }
    });
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-row ps-5 pt-5">
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Maestro</span>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              label="Email address"
              id="emailInput"  // Unique ID for email input
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-danger ms-5">{emailError}</p>}

            <div className="password-toggle mx-5 w-100 position-relative">
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="passwordInput"  // Unique ID for password input
                type={showPassword ? "text" : "password"}
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-text"
                style={{
                  position: 'absolute',
                  top: '22%',
                  right: '20px',
                  cursor: 'pointer',
                  transform: 'translateY(-50%)',
                  fontSize: '1rem',
                  color: '#007bff'
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {passwordError && <p className="text-danger ms-5">{passwordError}</p>}
            <p className="small mb-5 pb-lg-3 ms-5">
              <Link to={'/forgot_password'} href="#!" className="text-muted">Forgot password</Link>
            </p>

            <MDBBtn
              className="mb-4 px-5 mx-5 w-100"
              color="info"
              size="lg"
              onClick={handleLogin}
            >
              Login
            </MDBBtn>

            <p className="medium mb-5 ms-5">Don't have an account?
              <Link to={'/register'} href="#!" style={{ color: '#393f81' }}> Register here</Link>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image"
            className="rounded-start w-100"
            style={{ objectFit: 'cover', objectPosition: 'left' }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;