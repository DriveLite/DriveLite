import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/logo.svg"
      alt="Drive lite Logo"
      width={300}
      height={300}
      className=""
      priority
    />
  );
}
