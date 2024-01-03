'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ButtonProps {
    image: string;
    alt: string;
}

const dir = "../../public/";

export function MiniButton({image, alt}: ButtonProps){
    return(
        <div className='basis-1/12 grow-0' style={{height: '100%'}}>
            <div className='p-4'>
                <button style={{height: '100%'}}>
                    <img src={image} alt="alt" style={{height: '100%'}}/>
                </button>
            </div>
        </div>
    )
}