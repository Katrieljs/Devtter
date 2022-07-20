import { useState, useEffect } from "react"
import useUser from "../../hooks/useUser"
import Devit from "../../components/Devit"
import { listenLatestDevits } from "../../firebase/client"
import Link from "next/link"
import Head from "next/head"
import Header from "../../components/Header"
import PlaceholderItem from "../../components/PlaceholderItem"
import UserIcon from "../../icons/UserIcon"
import Nav from "../../components/Nav"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  useEffect(() => {
    if (timeline.length > 0) {
      setIsLoading(false)
    }
  }, [timeline])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>

      <Header>
        <div className="link-user">
          <Link href={`/user`}>
            <a>
              <UserIcon stroke="#999fff" width="32" height="32" />
            </a>
          </Link>
        </div>
        <h1>Inicio</h1>
      </Header>
      <section>
        {isLoading === true && data.map((id) => <PlaceholderItem key={id} />)}

        {isLoading === false &&
          timeline.map((devit) => (
            <Devit
              img={devit.img}
              key={devit.id}
              avatar={devit.avatar}
              content={devit.content}
              userName={devit.userName}
              userId={devit.userId}
              createdAt={devit.createdAt}
              id={devit.id}
              email={devit.email}
              file={devit.file}
              fileName={devit.fileName}
              fileSize={devit.fileSize}
              hover
            />
          ))}
      </section>

      <Nav />

      <style jsx>{`
        .link-user {
          padding-left: 18px;
          padding-right: 8px;
          padding-top: 5px;
        }
        .link-user a {
          color: #999fff;
          padding: 10px;
        }
        .link-user a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        .link-user a:hover {
          background: radial-gradient(#999fff11 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        .link-user a:hover > :global(svg) {
          stroke: #8222ff;
          color: #8222ff;
        }
      `}</style>
    </>
  )
}
