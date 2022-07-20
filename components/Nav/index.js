import Link from "next/link"
import Create from "../../icons/Create"
import Home from "../../icons/Home"
import Search from "../../icons/Search"

export default function Nav() {
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#999fff" width="32" height="32" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search stroke="#999fff" width="32" height="32" />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a>
            <Create stroke="#999fff" width="32" height="32" />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        nav {
          border-top: 1px solid #eee;
          height: 49px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: sticky;
          bottom: 0;
          width: 100%;
          background: #fff;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#999fff11 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: #8222ff;
          color: #8222ff;
        }
      `}</style>
    </>
  )
}
