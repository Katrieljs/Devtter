import { useState, useEffect } from "react"
import { fetchDevitsFromSearch } from "../../firebase/client"
import Header from "../../components/Header"
import Devit from "../../components/Devit"
import Link from "next/link"
import ArrowLeft from "../../icons/ArrowLeft"
import Nav from "../../components/Nav"
import PlaceholderItem from "../../components/PlaceholderItem"

export default function SearchPage() {
  const [text, setText] = useState("")
  const [timeline, setTimeline] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    fetchDevitsFromSearch(text).then((devits) => {
      setTimeline(devits)
      setIsLoading(false)
    })
  }, [text])

  return (
    <>
      <Header>
        <Link href="/home">
          <a>
            <ArrowLeft stroke="#111" width="32" height="32" />
          </a>
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={text}
          />
        </form>
      </Header>

      <section>
        <article>
          <h3>Busca terminos o plabras clave</h3>
        </article>
      </section>

      <section>
        {isLoading && (
          <>
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
              fileSize={devit.fileSize}
              hover
            />
          ))}
      </section>

      <Nav />

      <style jsx>{`
        a {
          padding-left: 15px;
        }
        form {
          display: flex;
          width: 100%;
          justify-content: center;
          padding-right: 30px;
        }
        input {
          padding: 8px 20px;
          border-radius: 99999px;
          background: #f7f7f7;
          border: 1px solid transparent;
          outline: 0;
          width: 86%;
        }
        article {
          width: 100%;
          height: 300px;
          display: flex;
          align-items: end;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
          background-color: #8bc6ec;
          background-image: linear-gradient(135deg, #8bc6ec 0%, #9933ff 100%);
        }
        h3 {
          color: #fff;
          padding-left: 25px;
          font-size: x-large;
        }
        section {
          min-height: 150px;
        }
      `}</style>
    </>
  )
}
