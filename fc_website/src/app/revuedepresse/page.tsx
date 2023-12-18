import { Pagination } from "@/components/Pagination";
import { getData } from "@/lib/dataReader";
import {
  SearchParams,
  getPaginatedResults,
  searchParamsSchema,
} from "@/lib/searchAndPagination";
import { formatDateVerbose } from "@/lib/utils";
import Link from "next/link";

export default function RevueDePresse(props: {
  params: unknown;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const parsingRes = searchParamsSchema.safeParse(props.searchParams);
  const searchParams: SearchParams = parsingRes.success ? parsingRes.data : {};

  const paginatedResults = getPaginatedResults(getData(), searchParams);
  return (
    <div className="px-4 py-28">
      <h1 className="text-6xl font-bold mb-10">Revue de presse</h1>
      <ul className="grid grid-cols-3 gap-8 mb-10">
        {paginatedResults.items.map((item) => {
          const url = `/revuedepresse/${item.id}`;
          return (
            <li
              key={item.id}
              className="block bg-white px-4 py-8 text-zinc-700"
            >
              {item.date ? (
                <p className="pb-8">{formatDateVerbose(item.date)}</p>
              ) : null}
              <h2 className="font-bold text-2xl pb-8 ">
                <Link href={url}>{item.titre}</Link>
              </h2>
              <p className="pb-8">{shorten(item.contenu)}</p>
              <Link href={url}>Lire la suite →</Link>
            </li>
          );
        })}
      </ul>
      <Pagination {...{ paginatedResults }} />
    </div>
  );
}

function shorten(s: string) {
  const limit = 200;
  if (s.length <= limit) return s;
  return s.slice(0, limit) + `...`;
}
