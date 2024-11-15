import Link from "next/link";

function IconLink({ svg, link, alt, children }) {
  return <Link href={link}>{children}</Link>;
}

export default IconLink;
