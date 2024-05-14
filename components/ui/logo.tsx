import Image from "next/image";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return <Image alt="logo" src="/logo.svg" width={width} height={height} />;
}
