

import { useState, useRef, useEffect } from 'react'
import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '','', ''])
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
const navigate =useNavigate();
  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 6) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleVerify = () => {
    const completeOtp = otp.join('')
    if (completeOtp.length === 6) {
      console.log('Verifying OTP:', completeOtp)
      // Add your verification logic here
      navigate('/create-new-password')
    }
  }

  const handleResend = () => {
    console.log('Resending OTP')
    // Add your resend logic here
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg shadow-lg rounded-lg p-8 border-[2px] border-[#818181] border-opacity-10 space-y-8">
        <div className="text-center">
          <h1 className="text-[24px] text-[#333333] font-bold  mb-4">
          Verification code
          </h1>
          <p className="text-gray-400 text-[16px]">
          We sent a reset link to contact@dscode...com
          enter 5 digit code that is mentioned in the email
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
            placeholder='0'
              key={index}
            
              ref={inputRefs[index]}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-2xl  border-[#818181] border-opacity-30 text-primary rounded"
              maxLength={1}
            />
          ))}
        </div>


        <button
        style={{ backgroundColor: '#1877F2',color:'white' }}
          onClick={handleVerify}
          disabled={otp.some(digit => !digit)}
          className="w-full bg-[#1877F2] hover:bg-[#C4A56E] disabled:opacity-50 
                   disabled:hover:bg-[#1877F2] text-black font-medium h-12 
                   rounded transition-colors"
        >
          Verify Code
        </button>
        <div className="text-center">
          <button
            onClick={handleResend}
            className="text-[#818181] hover:text-[#818181] text-[16px] font-medium"
          >
           You have not received the email?  <span className='text-[#1877F2]'>Resend</span>
          </button>
        </div>
      </div>
    </div>
  )
}

