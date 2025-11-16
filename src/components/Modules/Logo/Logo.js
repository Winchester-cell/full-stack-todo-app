import React from 'react'
import { AiFillCheckCircle } from "react-icons/ai";

export default function LogoComponent({ size }) {
    return (
        <div style={{ scale: size, fontFamily: "var(--font-bebasBold)" }} className={`flex items-center gap-2 text-3xl`}>
            <AiFillCheckCircle /> <span>NEXT TODO</span>
        </div>
    )
}
