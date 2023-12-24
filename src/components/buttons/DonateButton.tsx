import Link from "next/link";

export default function DonateButton() {
  return (
    <Link
      className="text-neutral-400 absolute bottom-4 transition-colors right-4 z-10 font-apple2mono hover:text-neutral-200"
      href="https://donate.stripe.com/9AQ4hH7TO2PrfsY4gg"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </Link>
  );
}
