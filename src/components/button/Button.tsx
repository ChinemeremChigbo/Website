import React from 'react';
import './Button.scss';
//Default styles that provide a ready to use button component when called. Styles can be overwritten using className component
const Color = ['primary', 'secondary', 'warning', 'danger', 'sucess'];
const Variant = ['solid', 'outline'];

//Need to provide type for tsx component properties specifically
interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: string;
  color: string;
  variant: string;
}

export const Button = ({ onClick, className, children, color, variant }: ButtonProps) => {
  //Defaults to Primary-Solid button if styles or classname is mistyped/does not exist
  const checkButtonColor = Color.includes(color) ? color : Color[0];
  const checkButtonVariant = Variant.includes(variant) ? variant : Variant[0];
  const checkButtonClass = className != null ? className : 'null';
  const buttonStyle = 'btn--' + color + '--' + variant;

  return (
    <button
      className={` btn  ${checkButtonColor} ${checkButtonVariant} ${checkButtonClass} ${buttonStyle} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
