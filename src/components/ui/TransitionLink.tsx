"use client";

import { animatePageOut } from "@/lib/animation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TransitionLink = ({ href, children, className = "" }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default TransitionLink;
