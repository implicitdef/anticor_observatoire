import { getData } from "@/lib/dataReader";
import { formatDateVerbose } from "@/lib/utils";
import Link from "next/link";

export default function RevueDePresse() {
  const items = getData().slice(0, 50);
  return (
    <div className="px-4 py-28">
      <h1 className="text-6xl font-bold mb-10">
        Liste des items de la revue de presse
      </h1>

      <ul className="grid grid-cols-3 gap-8">
        {items.map((item) => {
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
              <p className="pb-8">{item.contenu}</p>
              <Link href={url}>Lire la suite →</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
