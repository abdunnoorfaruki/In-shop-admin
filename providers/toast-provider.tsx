"use client"

import { Toaster } from "react-hot-toast"

import React, { useEffect, useState } from 'react'

const ToasterProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() =>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }
  return <Toaster/>
}

export default ToasterProvider