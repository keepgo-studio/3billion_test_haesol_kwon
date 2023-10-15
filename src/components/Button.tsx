import React from "react";

const Button = ({
  children,
  theme = 'primary',
  onClick,
  isDisabled
}: {
  children: React.ReactNode;
  theme?: "primary" | "gray";
  onClick?: React.MouseEventHandler;
  isDisabled?: boolean;
}) => {
  const getThemeStyle = () => {
    const sharedStyles = `w-72 h-12 font-light text-base flex-center rounded-full hover:text-white hover:bg-pblue duration-300
      ${isDisabled ? 'text-white !bg-gray-300 cursor-not-allowed' : ''}
    `;

    switch (theme) {
      case "gray":
        return `
          text-black
          bg-gray-100
          ${sharedStyles}
        `;
      case "primary":
      default:
        return `
          bg-primary
          text-white
          ${sharedStyles}
        `;
      }
    }
    
    return (
      <button
        onClick={onClick}
        className={getThemeStyle()}
      >
        {children}
      </button>
    );
};

export default Button;
