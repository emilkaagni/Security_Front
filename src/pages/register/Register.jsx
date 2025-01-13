// // import React, { useState } from 'react'
// // import { registerUserApi } from '../../apis/Api'
// // import { toast } from 'react-toastify'

// // const Register = () => {

// //   // Make a useState for 5 Fields
// //   const [firstName, setFirstName] = useState('')
// //   const [lastName, setLastName] = useState('')
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [confirmPassword, setConfirmPassword] = useState('')
// //   const [phone, setPhone] = useState('') // Added

// //   // Use State for Error Message
// //   const [firstNameError, setFirstNameError] = useState('')
// //   const [lastNameError, setLastNameError] = useState('')
// //   const [emailError, setEmailError] = useState('')
// //   const [passwordError, setPasswordError] = useState('')
// //   const [confirmPasswordError, setConfirmPasswordError] = useState('')
// //   const [phoneError, setPhoneError] = useState('') // Added

// //   // Make a each function for changing the value
// //   const handleFirstname = (e) => {
// //     setFirstName(e.target.value);
// //   }

// //   const handleLastname = (e) => {
// //     setLastName(e.target.value);
// //   }

// //   const handleEmail = (e) => {
// //     setEmail(e.target.value);
// //   }

// //   const handlePassword = (e) => {
// //     setPassword(e.target.value);
// //   }

// //   const handleConfirmPassword = (e) => {
// //     setConfirmPassword(e.target.value);
// //   }

// //   const handlePhone = (e) => {
// //     setPhone(e.target.value);
// //   }

// //   // validation
// //   var validate = () => {
// //     var isValid = true;

// //     // validate the firstname
// //     if (firstName.trim() === '') {
// //       setFirstNameError("Firstname is Required!")
// //       isValid = false
// //     }

// //     if (lastName.trim() === '') {
// //       setLastNameError("Lastname is Required!")
// //       isValid = false
// //     }

// //     if (email.trim() === '') {
// //       setEmailError("Email is Required!")
// //       isValid = false
// //     }

// //     if (phone.trim() === '') {
// //       setPhoneError("Phone Number is Required!")
// //       isValid = false
// //     }

// //     if (password.trim() === '') {
// //       setPasswordError("Password is Required!")
// //       isValid = false
// //     }

// //     if (confirmPassword.trim() === '') {
// //       setConfirmPasswordError("Confirm Password is Required!")
// //       isValid = false
// //     }

// //     if (confirmPassword.trim() !== password.trim()) {
// //       setConfirmPasswordError("Password and Confirm Password doesn't match!")
// //       isValid = false;
// //     }

// //     return isValid;

// //   }

// //   // Submit button Function
// //   const handleSubmit = (e) => {
// //     e.preventDefault()

// //     // validate
// //     var isValidated = validate();
// //     if (!isValidated) {
// //       return
// //     }

// //     // Sending request to the api

// //     // Making json object
// //     const data = {
// //       "firstName": firstName,
// //       "lastName": lastName,
// //       "email": email,
// //       "password": password,
// //       "phone": phone, // Added
// //     }

// //     registerUserApi(data).then((res) => {

// //       //  Received data : success, message
// //       if (res.data.success === false) {
// //         toast.error(res.data.message)
// //       } else {
// //         toast.success(res.data.message)
// //       }

// //     })


// //   }

// //   return (
// //     <>
// //       <div className='container mt-2'>
// //         <h1>Create an Account!</h1>

// //         <form className='w-50'>
// //           <label>Firstname : {firstName}</label>
// //           <input onChange={handleFirstname} type="text" className='form-control' placeholder='Enter your firstname' />

// //           {
// //             firstNameError && <p className='text-danger'>{firstNameError}</p>
// //           }

// //           <label className='mt-2'>Lastname</label>
// //           <input onChange={handleLastname} type="text" className='form-control' placeholder='Enter your lastname' />

// //           {
// //             lastNameError && <p className='text-danger'>{lastNameError}</p>
// //           }

// //           <label className='mt-2'>Email</label>
// //           <input onChange={handleEmail} type="text" className='form-control' placeholder='Enter your email' />
// //           {
// //             emailError && <p className='text-danger'>{emailError}</p>
// //           }

// //           <label className='mt-2'>Phone Number</label>
// //           <input onChange={handlePhone} type="number" className='form-control' placeholder='Enter your phone number' />
// //           {
// //             phoneError && <p className='text-danger'>{phoneError}</p>
// //           }

// //           <label className='mt-2'>Password</label>
// //           <input onChange={handlePassword} type="text" className='form-control' placeholder='Enter your password' />

// //           {
// //             passwordError && <p className='text-danger'>{passwordError}</p>
// //           }

// //           <label className='mt-2'>Confirm Password</label>
// //           <input onChange={handleConfirmPassword} type="text" className='form-control' placeholder='Enter your confirm password' />

// //           {
// //             confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>
// //           }

// //           <button onClick={handleSubmit} className='btn btn-dark mt-2 w-100'>Create an Account!</button>

// //         </form>


// //       </div>

// //     </>
// //   )
// // }

// // export default Register

// // // Step 1 : Make Complete UI of Register Page (Fields, Button, etc)
// // // step 2 : Input (Type) - Make a state
// // // Step 3 : OnChange - Set the value to the state



// // // https://codeshare.io/VNKEp8


// // // Make a login page
// // // Make a Path in App.js
// // // Make a frontend with email & Password
// // // Make a use State







// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow
// } from 'mdb-react-ui-kit';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { registerUserApi } from '../../apis/Api';

// function Register() {
//   // UseState for form fields
//   const [fname, setFname] = useState('');
//   const [lname, setLname] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phone, setPhone] = useState(''); // Added

//   // UseState for error messages
//   const [fnameError, setFnameError] = useState('');
//   const [lnameError, setLnameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');
//   const [phoneError, setPhoneError] = useState(''); // Added

//   // Validation function
//   const validate = () => {
//     let isValid = true;

//     // Validate first name
//     if (fname.trim() === '') {
//       setFnameError('Firstname is Required!');
//       isValid = false;
//     } else {
//       setFnameError('');
//     }

//     // Validate last name
//     if (lname.trim() === '') {
//       setLnameError('Lastname is Required!');
//       isValid = false;
//     } else {
//       setLnameError('');
//     }

//     // Validate email
//     if (email.trim() === '') {
//       setEmailError('Email is Required!');
//       isValid = false;
//     } else {
//       setEmailError('');
//     }

//     // Validate phone
//     if (phone.trim() === '') {
//       setPhoneError('Phone Number is Required!');
//       isValid = false;
//     } else {
//       setPhoneError('');
//     }

//     // Validate Username
//     if (username.trim() === '') {
//       setUsernameError('Username is Required!');
//       isValid = false;
//     } else {
//       setUsernameError('');
//     }

//     // Validate password
//     if (password.trim() === '') {
//       setPasswordError('Password is Required!');
//       isValid = false;
//     } else {
//       setPasswordError('');
//     }

//     // Validate confirm password
//     if (confirmPassword.trim() === '') {
//       setConfirmPasswordError('Confirm Password is Required!');
//       isValid = false;
//     } else if (confirmPassword.trim() !== password.trim()) {
//       setConfirmPasswordError("Password and Confirm Password doesn't match!");
//       isValid = false;
//     } else {
//       setConfirmPasswordError('');
//     }

//     return isValid;
//   };

//   // Submit button function
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate
//     if (!validate()) {
//       return;
//     }

//     // Making JSON object
//     const data = {
//       fname: fname,
//       lname: lname,
//       email: email,
//       username: username,
//       password: password,
//       phone: phone, // Added
//     };

//     // Sending request to the API
//     registerUserApi(data).then((res) => {
//       // Received data: success, message
//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//       }
//     });
//   };

//   return (
//     <MDBContainer className="my-5">
//       <MDBCard>
//         <MDBRow className='g-0'>
//           <MDBCol md='6'>
//             <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
//           </MDBCol>

//           <MDBCol md='6'>
//             <div className='d-flex flex-column'>

//               <div className='d-flex flex-row mt-2'>
//                 <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
//                 <span className="h1 fw-bold mb-0">Maestro</span>
//               </div>

//               <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an Account!</h5>

//               <MDBInput wrapperClass='mb-4' label='First Name' id='formControlLg' type='text' size="lg" value={fname} onChange={(e) => setFname(e.target.value)} />
//               {fnameError && <p className="text-danger">{fnameError}</p>}

//               <MDBInput wrapperClass='mb-4' label='Last Name' id='formControlLg' type='text' size="lg" value={lname} onChange={(e) => setLname(e.target.value)} />
//               {lnameError && <p className="text-danger">{lnameError}</p>}

//               <MDBInput wrapperClass='mb-4' label='Email Address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
//               {emailError && <p className="text-danger">{emailError}</p>}

//               <MDBInput wrapperClass='mb-4' label='Phone Number' id='formControlLg' type='number' size="lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
//               {phoneError && <p className="text-danger">{phoneError}</p>}

//               <MDBInput wrapperClass='mb-4' label='User Name' id='formControlLg' type='username' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} />
//               {usernameError && <p className="text-danger">{usernameError}</p>}

//               <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
//               {passwordError && <p className="text-danger">{passwordError}</p>}

//               <MDBInput wrapperClass='mb-4' label='Confirm Password' id='formControlLg' type='password' size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//               {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}

//               <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Create an Account!</MDBBtn>

//               <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account?
//                 <Link to={'/login'} href="#!" style={{ color: '#393f81' }}>Login here</Link></p>

//               <div className='d-flex flex-row justify-content-start'>
//                 <a href="#!" className="small text-muted me-1">Terms of use.</a>
//                 <a href="#!" className="small text-muted">Privacy policy</a>
//               </div>

//             </div>
//           </MDBCol>
//         </MDBRow>
//       </MDBCard>
//     </MDBContainer>
//   );
// }

// export default Register;



import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../apis/Api';

function Register() {
  // UseState for form fields
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  // UseState for error messages
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validation function
  const validate = () => {
    let isValid = true;

    if (fname.trim() === '') {
      setFnameError('Firstname is Required!');
      isValid = false;
    } else {
      setFnameError('');
    }

    if (lname.trim() === '') {
      setLnameError('Lastname is Required!');
      isValid = false;
    } else {
      setLnameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is Required!');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phone.trim() === '') {
      setPhoneError('Phone Number is Required!');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (username.trim() === '') {
      setUsernameError('Username is Required!');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is Required!');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is Required!');
      isValid = false;
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and Confirm Password doesn't match!");
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  // Submit button function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      username: username,
      password: password,
      phone: phone,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard className="border-0">
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <div className='d-flex flex-column p-4'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Maestro</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Create an Account!</h5>

              <MDBInput 
                wrapperClass='mb-4' 
                label='First Name' 
                id='formControlLg' 
                type='text' 
                size="lg" 
                value={fname} 
                onChange={(e) => setFname(e.target.value)} 
                hint='Enter your first name'
              />
              {fnameError && <p className="text-danger">{fnameError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='Last Name' 
                id='formControlLg' 
                type='text' 
                size="lg" 
                value={lname} 
                onChange={(e) => setLname(e.target.value)} 
                hint='Enter your last name'
              />
              {lnameError && <p className="text-danger">{lnameError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='Email Address' 
                id='formControlLg' 
                type='email' 
                size="lg" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                hint='Enter your email address'
              />
              {emailError && <p className="text-danger">{emailError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='Phone Number' 
                id='formControlLg' 
                type='number' 
                size="lg" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                hint='Enter your phone number'
              />
              {phoneError && <p className="text-danger">{phoneError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='User Name' 
                id='formControlLg' 
                type='text' 
                size="lg" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                hint='Choose a username'
              />
              {usernameError && <p className="text-danger">{usernameError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                id='formControlLg' 
                type='password' 
                size="lg" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                hint='Enter your password'
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}

              <MDBInput 
                wrapperClass='mb-4' 
                label='Confirm Password' 
                id='formControlLg' 
                type='password' 
                size="lg" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                hint='Confirm your password'
              />
              {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleSubmit}>Create an Account!</MDBBtn>

              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Already have an account?
                <Link to={'/login'} style={{ color: '#393f81' }}> Login here</Link>
              </p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
