import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-2 px-3 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between xl:px-4">
        <div className="">
          <h1 className="text-xl lg:text-2xl font-semibold text-white flex items-center mb-1">
            Journalist Dashboard
          </h1>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">Live Market</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Last Updated</div>
          <div className="text-white text-sm">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
