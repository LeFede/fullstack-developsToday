import { localApi, maybe } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import Population from "./(population)";
import { Country } from "../page";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { countryName: string };
}): Promise<Metadata> {
  const [err, countryData] = (await maybe(() =>
    localApi.get(params.countryName),
  )) as [{ message: string }, CountryData];

  if (err)
    return {
      title: "Error",
    };

  return {
    title: `Countries API | ${countryData.name}`,
  };
}

export interface CountryData {
  borders: Border[];
  name: string;
  population: Population[];
  flag: string;
}

export interface Border {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Country;
}

export interface Population {
  year: number;
  value: number;
}

export default async function CountryDetail({
  params,
}: {
  params: { countryName: string };
}) {
  const [err, countryData] = (await maybe(() =>
    localApi.get(params.countryName),
  )) as [{ message: string }, CountryData];

  if (err)
    return (
      <>
        <Link href="/countries" className="text-blue-500 hover:underline mb-4">
          Back to list
        </Link>
        <p>Could not get this country :(</p>
      </>
    );

  return (
    <div className="">
      <Link href="/countries" className="text-blue-500 hover:underline mb-4">
        Back to list
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={countryData.flag}
          width={40}
          height={40}
          alt={`flag of ${countryData.name}`}
          title={`flag of ${countryData.name}`}
        />
        <h1 className="text-4xl font-bold">{countryData.name}</h1>
      </div>
      <div className="mb-4">
        <p className="text-lg mb-2 font-bold">Borders:</p>
        <ul className="text-center flex items-center gap-4 flex-wrap">
          {countryData.borders.length === 0 && <>No Borders!</>}
          {countryData.borders.map((border) => (
            <li key={border.countryCode}>
              <Link
                href={`/countries/${border.countryCode}`}
                className="text-blue-600 hover:underline"
              >
                {border.commonName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <Population population={countryData.population}></Population>
      </div>
    </div>
  );
}
