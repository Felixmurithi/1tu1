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
    primary: "bg-rose-800  text-stone-900 px-2 py-1 text-white font-semibold ",
    secondary: "bg-blue-background  text-stone-900 px-2 py-1 text-white ",
    transparent: "px-2 bg-transparent border border-2 py-1 ",
    icon: "px-1 py-0 w-max hover:bg-rose-300 ",
  };

  return (
    <button
      type={`${link || onClick ? "button" : "submit"}`}
      className={` ${buttonStyles[type]}  rounded-md ${classes} h-8`}
      onClick={onClick}
    >
      {link ? <Link href={link}>{children}</Link> : children}
    </button>
  );
}

export function SaveButton({ onClick }) {
  return (
    <button type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-rose-800 hover:fill-rose-600 px-1 py-0 w-max "
        onClick={onClick}
      >
        <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
      </svg>
    </button>
  );
}
