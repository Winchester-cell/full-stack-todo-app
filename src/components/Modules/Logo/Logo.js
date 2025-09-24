import React from 'react'
import { SiSimplenote } from "react-icons/si"

export default function LogoComponent({ size }) {
    return (
        <div style={{scale:size , fontFamily: "var(--font-bebasBold)"}} className={`flex items-center gap-2 text-3xl`}>
            <SiSimplenote /> <span>NEXT TODO</span>
        </div>
    )
}
