import React from 'react'

function Button({ 
    children,
    type='button',
    bgColor='bg-blue-900',
    textColor='text-orange',
    className='',
    ...props
}) {
  return (
    <button className={`py-2 px-4 rounded-lg  ${bgColor} ${className} ${textColor}`}
    {...props} >  
        {children}
    </button>
  );
}

export default Button