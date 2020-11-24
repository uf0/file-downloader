import React from "react"
import { BsFileEarmark, BsFileEarmarkArrowDown, BsFileEarmarkCheck } from 'react-icons/bs'



const Icon = ({status}) => {
    const renderIcon = (status)=>{
      switch (status) {
        case "progress":
          return <BsFileEarmarkArrowDown />;
        case "done":
          return <BsFileEarmarkCheck />;
        default:
          return <BsFileEarmark />
      }
    }
    return (
      <>
        { renderIcon(status) }
      </>
    )
  }

  export default Icon