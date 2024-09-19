import Link from "next/link";
import { localApi, maybe } from "../utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countries API | All",
  description: "Nice list 🌍️",
};

export type Countries = Country[];
export interface Country {
  countryCode: string;
  name: string;
}

export default async function Countries() {
  const [err, countries] = (await maybe(() => localApi.get(""))) as [
    { message: string },
    Country[],
  ];

  if (err)
    return (
      <>
        <Link href="/" className="text-blue-500 hover:underline mb-4">
          Back to home
        </Link>
        There was a problem fetching countries :(
      </>
    );

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <Link href="/" className="text-blue-500 hover:underline mb-4">
          Back to home
        </Link>
        <h1 className="text-2xl font-bold mb-6">Countries List</h1>
        <ul className="flex gap-4 flex-wrap">
          {countries.map((country) => (
            <li key={country.countryCode}>
              <Link
                href={`/countries/${country.countryCode}`}
                className="text-blue-600 hover:underline"
              >
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
