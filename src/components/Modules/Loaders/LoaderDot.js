import React from 'react'

export default function LoaderDot({ color = 'black' , size = 60 }) {
    return (
        <div style={{ "--dot": color , width:size }} className="loader_dot"></div>
    )
}
