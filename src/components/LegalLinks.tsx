import Link from "next/link";
import React, { ComponentPropsWithRef } from "react";

export const LegalLinks = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div {...props} className={className}>
      <div className="text-xs font-medium text-gray-500">
        <div className="flex items-center justify-center gap-2 flex-wrap">
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
          <Link
            href="https://fuerst.one/datenschutz"
            className="hover:underline"
          >
            privacy policy
          </Link>
        </div>
        <div className="mt-2">
          Thanks to{" "}
          <span>
            <Link href="https://pmnd.rs/" className="hover:underline">Poimandres</Link>,{" "}
            <Link href="https://gsap.org/" className="hover:underline">GSAP</Link>,{" "}
            <Link href="https://threejs.org/" className="hover:underline">three.js</Link>
          </span>{" "}
          and you, for making this possible.
        </div>
      </div>
    </div>
  );
};
