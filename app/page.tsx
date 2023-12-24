import Canva from "@/components/Canva";
import dynamic from "next/dynamic";

// const Canva = dynamic(() => import("@/components/Canva"), { ssr: false });

export default function Home() {
  return (
    <>
      <Canva />
    </>
  );
}
