"use client"

import React, {useEffect} from 'react';

const Pwa = () => {
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", async function () {
            await navigator.serviceWorker.register("/sw.js")
        })
      }

    }, []);
    
  return <></>
}

export default Pwa
