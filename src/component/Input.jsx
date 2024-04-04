import React, { useId } from 'react'

const Input = React.forwardRef( function Input(
    {   label,
        type='text',
        className='',
        ...props
    }, ref
){
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label 
            
                className='inline-block mb-1 pl-1'
                htmlFor={id}

                >
                    {label}
            </label>}
            
            <input 
            type={type} 
            className={`px-3 py-2 bg-white outline-none text-black focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
            {...props}
            ref={ref}
            id={id}             // label pe click kren to hme sidha input pe curser chla jaye
            />


        </div>
    )
})

export default Input