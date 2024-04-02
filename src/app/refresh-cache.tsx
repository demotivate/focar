'use client'

import { useInterval } from 'usehooks-ts'
import { useEffect, useState } from "react"

export function RefreshCache({ check }: { check: () => Promise<void>}) {
    const [shouldRun, setShouldRun] = useState(true);

    useEffect(() => {
        const onFocus = () => setShouldRun(true);
        const onBlur = () => setShouldRun(false);

        window.addEventListener("focus", onFocus);
        window.addEventListener("blue", onBlur);

        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur)
        }
    })
    
    useInterval(check, shouldRun ? 100: null)
    return null;
}