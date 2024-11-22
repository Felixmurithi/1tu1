"use client";

import Link from "next/link";

export default function Button({
  children,
  onClick,
  link = "",
  type = "primary",
  classes,
}) {
  const buttonStyles = {
    primary:
      "bg-orange-800  text-stone-900 px-2 py-1 text-white font-semibold hover:bg-orange-700",
    secondary: "bg-blue-background  text-stone-900 px-2 py-1 text-white ",
    transparent:
      "px-2 bg-transparent border-2 border-orange-800 py-1 font-semibold hover:border-orange-700 ",
    icon: "px-1 py-0 w-max  hover:bg-orange-100 ",
  };

  return (
    <button
      type={`${link || onClick ? "button" : "submit"}`}
      className={` ${buttonStyles[type]}  rounded-md ${classes} h-8 w-fit`}
      onClick={onClick}
    >
      {link ? <Link href={link}>{children}</Link> : children}
    </button>
  );
}

export function SaveButton({ onClick }) {
  return (
    <button type="button" onClick={() => onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-orange-700 hover:fill-orange-500 "
      >
        <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
      </svg>
    </button>
  );
}

export function CancelButton({ onClick }) {
  return (
    <button type="button" onClick={() => onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-orange-700 hover:fill-orange-500  "
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </button>
  );
}
