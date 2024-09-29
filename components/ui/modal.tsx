"use client"
interface DialogProps {
    title:string,
    description:string,
    isOpen:boolean,
    onClose: () => void,
    children?: React.ReactNode
}

import React from 'react'
import { Dialog, DialogContent, DialogHeader,DialogTitle,DialogDescription } from '@/components/ui/dialog'

const Modal: React.FC<DialogProps>  = ({title, description, isOpen, onClose, children}) => {
  const onChange = (open:boolean) => {
    if(!open){
        onClose()
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onChange} >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            <div className="">
                { children}
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Modal