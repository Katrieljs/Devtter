import Devit from "../../components/Devit"
import Header from "../../components/Header"
import ArrowLeft from "../../icons/ArrowLeft"
import { useRouter } from "next/router"
import Nav from "../../components/Nav"

export default function StatusPage(props) {
  const router = useRouter()
  const handleClick = () => {
    router.back()
  }
  return (
    <>
      <Header>
        <div onClick={handleClick}>
          <ArrowLeft stroke="#111" width="32" height="32" />
        </div>
      </Header>
      <section>
        <Devit
          img={props.img}
          key={props.id}
          avatar={props.avatar}
          content={props.content}
          userName={props.userName}
          email={props.email}
          userId={props.userId}
          createdAt={props.createdAt}
          id={props.id}
          file={props.file}
          fileName={props.fileName}
          fileSize={props.fileSize}
          modal
        />
      </section>
      <Nav />
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          padding: 12px;
          cursor: pointer;
        }
        div:hover {
          background: radial-gradient(#eee8 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        section {
          min-height: 450px;
        }
      `}</style>
    </>
  )
}

const API_URL = process.env.API_URL

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`${API_URL}/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}
