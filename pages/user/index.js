import Link from "next/link"
import Header from "../../components/Header"
import ArrowLeft from "../../icons/ArrowLeft"
import useUser from "../../hooks/useUser"
import Button from "../../components/Button"
import Devit from "../../components/Devit"
import { logout, fetchYouDevits } from "../../firebase/client"
import UserCard from "../../components/UserCard"
import { useState, useEffect } from "react"
import PlaceholderItem from "../../components/PlaceholderItem"
import Nav from "../../components/Nav"

export default function StatusPage() {
  const [timeline, setTimeline] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const user = useUser()

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      fetchYouDevits(user.username).then((devits) => {
        setTimeline(devits)
        setIsLoading(false)
      })
    }
  }, [user])

  return (
    <>
      <Header>
        <Link href="/home">
          <a>
            <ArrowLeft stroke="#111" width="32" height="32" />
          </a>
        </Link>
      </Header>

      <section>
        <article>
          {user && (
            <UserCard
              avatar={user.avatar}
              username={user.username}
              email={user.email}
            />
          )}

          <Button onClick={handleLogout}>Logout</Button>
        </article>

        <h4>Tus devits</h4>

        <section className="timeline">
          {isLoading && (
            <>
              <PlaceholderItem />
              <PlaceholderItem />
              <PlaceholderItem />
              <PlaceholderItem />
              <PlaceholderItem />
              <PlaceholderItem />
            </>
          )}
          {timeline &&
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
                hover
              />
            ))}
        </section>
      </section>

      <Nav />

      <style jsx>{`
        a {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          padding: 12px;
        }
        a:hover {
          background: radial-gradient(#eee8 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        article {
          display: flex;
          flex-direction: column;
          padding: 10px 20px;
        }

        h4 {
          padding: 10px 20px;
          border-bottom: 1px solid #eee;
        }
        .timeline {
          min-height: 300px;
        }
      `}</style>
    </>
  )
}
