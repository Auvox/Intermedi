import React from 'react'

export const Input = ({
    label,
    id, 
    onchange,
    value, 
    type, 
    onBlur, 
    placeHolder, 
    erro, 

}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
            id={id}
            name={id}
            onChange={onchange}
            placeholder={placeHolder}
            onBlur={onBlur}
            type={type}            
            value={value}
            />
            {erro && <p>{erro}</p>}
        </div>
    )
}