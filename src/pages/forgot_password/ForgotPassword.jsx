// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'

// const ForgotPassword = () => {

//   // make a state
//   const [phone, setPhone] = useState('')
//   const [isSent, setIsSent] = useState(false)
//   const [otp, setOtp] = useState('')
//   const [newPassword, setNewPassword] = useState('')

//   // send otp function
//   const handleSendOtp = (e) => {
//     e.preventDefault()

//     // api call
//     forgotPasswordApi({ phone }).then((res) => {
//       if (res.status === 200) {
//         toast.success(res.data.message)
//         setIsSent(true)
//       }
//     }).catch((error) => {
//       if (error.response.status === 400 || 500) {
//         toast.error(error.response.data.message)
//       }
//     })

//   }

//   // verify otp and set password
//   const handleVerifyOtp = (e) => {
//     e.preventDefault()

//     const data = {
//       'phone': phone,
//       'otp': otp,
//       'newPassword': newPassword
//     }

//     // api call
//     verifyOtpApi(data).then((res) => {
//       if (res.status === 200) {
//         toast.success(res.data.message)
//       }
//     }).catch((error) => {
//       if (error.response.status === 400 || 500) {
//         toast.error(error.response.data.message)
//       }
//     })

//   }

//   return (
//     <>
//       <div className='container mt-3'>
//         <h3>Forgot Password!</h3>

//         <form className='w-25'>
//           <span className='d-flex'>
//             <h4>+977</h4>
//             <input disabled={isSent} onChange={(e) => setPhone(e.target.value)} type="number" className='form-control' placeholder='Enter valid phone number' />
//           </span>

//           <button disabled={isSent} onClick={handleSendOtp} className='btn btn-dark mt-2 w-100'>Send OTP</button>

//           {
//             isSent && <>
//               <hr />
//               <p>OTP has been sent to {phone}✅</p>
//               <input onChange={(e) => setOtp(e.target.value)} placeholder='Enter valid OTP Code!' type="number" className='form-control' />
//               <input onChange={(e) => setNewPassword(e.target.value)} type="text" className='form-control mt-2' placeholder='Set New Password!' />

//               <button onClick={handleVerifyOtp} className='btn btn-primary w-100 mt-2'>Verify OTP & Set Password</button>
//             </>
//           }

//         </form>

//       </div>
//     </>
//   )
// }

// export default ForgotPassword


// // Logic for Forgot Password
// // 1. Make a UI DONE
// // 2. Make a state
// // 3. Send OTP (Make a api call)
// // if send otp success:
// // Disable the Input, Button
// // Show the UI : (OTP Input, Set Password Input)
// // Verify otp and set password
// // if not verified dont change password




// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api';
// import './ForgotPassword.css'; // Assuming you have a separate CSS file for styles

// const ForgotPassword = () => {

//   const [phone, setPhone] = useState('')
//   const [isSent, setIsSent] = useState(false)
//   const [otp, setOtp] = useState('')
//   const [newPassword, setNewPassword] = useState('')

//   const handleSendOtp = (e) => {
//     e.preventDefault()
//     forgotPasswordApi({ phone }).then((res) => {
//       if (res.status === 200) {
//         toast.success(res.data.message)
//         setIsSent(true)
//       }
//     }).catch((error) => {
//       if (error.response.status === 400 || 500) {
//         toast.error(error.response.data.message)
//       }
//     })
//   }

//   const handleVerifyOtp = (e) => {
//     e.preventDefault()
//     console.log(phone, otp, newPassword)
//     const data = {
//       phone,
//       otp,
//       newPassword
//     }

//     verifyOtpApi(data).then((res) => {
//       if (res.status === 200) {
//         toast.success(res.data.message)
//       }
//     }).catch((error) => {
//       if (error.response.status === 400 || 500) {
//         toast.error(error.response.data.message)
//       }
//     })
//   }

//   return (
//     <div className="forgot-password-container">
//       <div className="forgot-password-card">
//         <h3>Reset password</h3>
//         <form>
//           {!isSent ? (
//             <>
//               <input
//                 disabled={isSent}
//                 onChange={(e) => setPhone(e.target.value)}
//                 type="number"
//                 className="input-field"
//                 placeholder="Enter valid phone number"
//               />
//               <button
//                 disabled={isSent}
//                 onClick={handleSendOtp}
//                 className="btn"
//               >
//                 Send OTP
//               </button>
//             </>
//           ) : (
//             <>
//               <p>OTP has been sent to {phone}</p>
//               <div className="otp-input-container">
//                 {[...Array(6)].map((_, index) => (
//                   <input
//                     key={index}
//                     onChange={(e) => setOtp((prev) => {
//                       const newOtp = prev.split('');
//                       newOtp[index] = e.target.value;
//                       return newOtp.join('');
//                     })}
//                     maxLength="1"
//                     type="text"
//                     className="otp-input"
//                   />
//                 ))}
//               </div>
//               <input
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 type="text"
//                 className="input-field"
//                 placeholder="Set New Password!"
//               />
//               <button
//                 onClick={handleVerifyOtp}
//                 className="btn"
//               >
//                 Continue
//               </button>
//               <p className="resend-otp">Didn't receive code</p>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword





import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'
import './ForgotPassword.css'

const ForgotPassword = () => {
  const [phone, setPhone] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [newPassword, setNewPassword] = useState('')

  const handleSendOtp = (e) => {
    e.preventDefault()
    forgotPasswordApi({ phone }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
        setIsSent(true)
      }
    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }
    })
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    console.log(phone, otp.join(''), newPassword)
    const data = {
      phone,
      otp: otp.join(''),
      newPassword
    }
    verifyOtpApi(data).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
      }
    }).catch((error) => {
      if (error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }
    })
  }

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  return (
    <div className="forgot-password-container-forpw">
      <div className="forgot-password-card-forpw">
        <h3 className="header-forpw">Reset password</h3>
        <form>
          {!isSent ? (
            <>
              <input
                disabled={isSent}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="input-field-forpw"
                placeholder="Enter valid phone number"
              />
              <button
                disabled={isSent}
                onClick={handleSendOtp}
                className="btn-forpw"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <p>OTP has been sent to {phone}</p>
              <div className="otp-input-container-forpw">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength="1"
                    type="number"
                    className="otp-input-forpw"
                    value={value}
                  />
                ))}
              </div>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                className="input-field-forpw"
                placeholder="Set New Password!"
              />
              <button
                onClick={handleVerifyOtp}
                className="btn-forpw"
              >
                Continue
              </button>
              <p className="resend-otp-forpw">Didn't receive code</p>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
