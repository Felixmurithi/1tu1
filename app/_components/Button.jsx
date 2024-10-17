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
    primary: "bg-orange-accent  text-stone-900 px-2 py-1 ",
    secondary: "bg-blue-background  text-stone-900 px-2 py-1 text-white ",
    transparent: "px-2 bg-transparent border border-2 py-1 ",
    icon: "px-0 py-0 w-max ",
  };

  return (
    <button
      type={`${link || onClick ? "button" : "submit"}`}
      className={` ${buttonStyles[type]}  rounded-md ${classes} h-8`}
      onClick={onClick}
    >
      {/* <button type="submit"> */}
      {link ? <Link href={link}>{children}</Link> : children}
    </button>
  );
}
