import Image from "next/image";

export default function logoSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-2">
          <Image src={"/logo_icon.svg"} width={150} height={150} alt="logo" />
          <h1 className="text-xl font-bold">DriveLite</h1>
        </div>
      </div>
    </section>
  );
}
