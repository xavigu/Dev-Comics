import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <h1 className="font-bold">
        <Link href='/'>
          <a className="hover:opacity-80">
            next <span className="font-light">Comic Jokes</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          <li><Link href='/'><a className="text-xs font-semibold">Home</a></Link></li>
          <li><Link href='/search'><a className="text-xs font-semibold">Search</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}
