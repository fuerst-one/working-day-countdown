import Link from "next/link";
import React, { ComponentPropsWithRef } from "react";

export const LegalLinks = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      {...props}
      className={`flex items-center justify-center gap-2 text-xs flex-wrap font-medium text-gray-500 lg:text-xs ${className}`}
    >
      <Link href="https://fuerst.one" className="hover:underline">
        &copy; {new Date().getFullYear()} https://fuerst.one
      </Link>
      <span className="hidden sm:block">|</span>
      <Link
        href="https://github.com/fuerst-one/working-day-countdown"
        className="hover:underline"
      >
        github
      </Link>
      <Link href="https://fuerst.one/impressum" className="hover:underline">
        imprint
      </Link>
      <Link href="https://fuerst.one/datenschutz" className="hover:underline">
        privacy policy
      </Link>
    </div>
  );
};
