import React, { useEffect, useState } from 'react'

import { IoMoonSharp } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";

const DarkToggle = ({ size }) => {

    const [darkMode, setDarkMode] = useState(false);

    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const themeCheck = () => {
        console.log(userTheme)
        if(userTheme == "dark" || (!userTheme && systemTheme)){
            document.documentElement.classList.add("dark");
            setDarkMode(true);
            return;
        }
        setDarkMode(false);
    }

    const toggleTheme = () => {
        if(darkMode == true){
            setDarkMode(false);
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }else{
            setDarkMode(true);
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    }

    useEffect(()=>{
        themeCheck();
    },[])

  return (
    <main onClick={toggleTheme} className='cursor-pointer '>
      {darkMode? <IoMdSunny size={size} /> : <IoMoonSharp size={size} /> }
    </main>
  )
}

export default DarkToggle
