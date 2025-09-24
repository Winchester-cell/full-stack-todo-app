'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';


export default function EnClockMobile() {
    const [now, setNow] = useState(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(dayjs())
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-[10px] flex h-full shadow-inner rounded-full px-5 py-3 justify-center items-center gap-3 bg-[var(--colorA)]">
            <div>
                {now.format("dddd")}
            </div>
            <div>
                {now.format('YYYY / MM / DD ')}
            </div>
            <div>{now.format('HH : mm ')}</div>
        </div>
    )
}
