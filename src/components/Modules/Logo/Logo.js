import React from 'react'
import { SiSimplenote } from "react-icons/si"

export default function LogoComponent({ size }) {
    return (
        <div style={{scale:size}} className={`flex items-center gap-2 text-3xl font-[bebasBold]`}>
            <SiSimplenote /> <span>NEXT TODO</span>
        </div>
    )
}
