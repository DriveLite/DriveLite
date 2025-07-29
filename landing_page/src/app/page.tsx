import Image from "next/image";

export default function Home() {
  return (
    <div className="grid min-h-screen place-items-end pr-8">
      <Image
        src="/logo.svg"
        alt="Next.js Logo"
        width={300}
        height={300}
        className="dark:invert m-0"
        priority
      />
    </div>
  );
}
