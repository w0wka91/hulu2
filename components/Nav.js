import { useRouter } from "next/dist/client/router";
import requests from "../utils/requests";

export function Nav() {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex text-2xl whitespace-nowrap px-10 space-x-10 justify-center">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            className="cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500"
            key={key}
            onClick={() => router.push(`/?genre=${key}`)}
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12"></div>
    </nav>
  );
}
