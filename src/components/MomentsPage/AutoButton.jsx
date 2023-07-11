import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

export default function SwitchButton(props) {
  const { setVideoInfo } = props;
  const [toggle, setToggle] = useState(true);

  const handleOnChange = () => {
    if(toggle){
      setToggle(false);
      setVideoInfo((prev)=>({...prev, loop: 1}));
    }
    if(!toggle){
      setToggle(true);
      setVideoInfo((prev)=>({...prev, loop: 0}));
    }
  };

  return (
    <div className="loop-toggle">
      <p>LOOP:</p>
      <BootstrapSwitchButton
        onlabel='ON'
        offlabel='OFF'
        onChange={() => handleOnChange()}
        onstyle="success"
        width='80'
      />
    </div>

  );
}