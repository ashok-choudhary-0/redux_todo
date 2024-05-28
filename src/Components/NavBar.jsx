import React from 'react';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';

const NavBar = ({ dateTime }) => {
  return (
    <div className="flex justify-between items-center px-3 mt-2">
      <p>{dateTime}</p>
      <div className="flex gap-1">
        <FaSignal />
        <FaWifi />
        <FaBatteryFull />
      </div>
    </div>
  );
};

export default NavBar;
