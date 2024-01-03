'use client'

import { useEffect, useState } from 'react';

export function SidebarContainer(props:any){
    return(
        <div className='flex flex-col basis-1/6 bg-dTeal'></div>
    )
}

export function SidebarTab(props:any){
    return(
        <div className='basis-auto'>
            <p className='text-center my-5'>{props.section}</p>
        </div>
    )
}