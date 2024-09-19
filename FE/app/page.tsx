import Link from "next/link";

import "./env";

export default function Home() {
  return (
    <div className="text-center flex h-full flex-col justify-center">
      <h1 className="text-3xl font-bold">Country API</h1>
      <Link href="/countries" className="text-blue-600 hover:underline">
        List all
      </Link>
    </div>
  );
}
