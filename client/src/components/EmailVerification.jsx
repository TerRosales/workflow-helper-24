import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import { MdOutlineMarkEmailUnread } from "react-icons/md";


function EmailVerification() {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move to the next input field
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = values.join('');
    console.log('Verification code:', code);
    // Add your submit logic here
  };

  return (
    <div className="h-[100vh] p-2 text-center bg-white">
      <div className='flex justify-content-center items-center gap-2 my-5
      '>
        <span className='w-full h-1 border-2 border-neutral-900' />
        <MdOutlineMarkEmailUnread className='text-[50px]'/>
        <span className='w-full h-1 border-2 border-neutral-900'/>

      </div>
      <p>We have sent you a <span className='font-semibold'>verification code</span> to your Email Address that you have provided.</p>
      <section className="lg:w-1/2 mx-auto rounded p-2 my-14 border-neutral-900 border-b-2 border-r-2 border-2 border-l-neutral-400 border-t-neutral-200">
        <form onSubmit={handleSubmit} className='flex flex-col justify-center'>
          <label className='font-semibold my-5' htmlFor="email">Confirm Email:</label>
          <input type="text" id='email' placeholder='Email Address' />
          <span className='mt-5 font-semibold'>Enter Verification code:</span>
          <section className="flex justify-center my-5">
            {values.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 text-center border-2 border-gray-300 mx-1"
                style={{ fontSize: '20px' }}
              />
            ))}
          </section>
          <Button type="submit" className="buttonUniLight mb-5 w-[100px] mx-auto">Verify</Button>
        </form>
        
      </section>
      <div className='flex justify-content-center items-center gap-2 my-5
      '>
        <span className='w-full h-1 border-2 border-neutral-900' />
        <MdOutlineMarkEmailUnread className='text-[50px]'/>
        <span className='w-full h-1 border-2 border-neutral-900'/>

      </div>
    </div>
  );
}

export default EmailVerification;
