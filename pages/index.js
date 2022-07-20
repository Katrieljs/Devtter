import { useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import Button from "../components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { loginWithGithub, loginWithGoogle } from "../firebase/client"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "../hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGithub().catch((err) => {
      console.log(err)
    })
  }

  const handleClickGoogle = () => {
    loginWithGoogle().catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <Head>
        <title>Devtter</title>
        <meta name="description" content="Devter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Image
          src="/code-solid.svg"
          width="60px"
          height="60px"
          alt="logo"
        ></Image>
        <h1>Devtter</h1>
        <h2>
          Talk about development
          <br />
          with developers
        </h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <div className="login-container">
              <Button onClick={handleClick}>
                <div>
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                Login with GitHub
              </Button>
              <Button onClick={handleClickGoogle}>
                <div>
                  <FontAwesomeIcon icon={faGoogle} />
                </div>
                Login with Google
              </Button>
            </div>
          )}
          {user === USER_STATES.NOT_KNOW && <span>Loading...</span>}
        </div>
      </section>

      <style jsx>{`
        section {
          display: grid;
          height: 95vh;
          place-content: center;
          place-items: center;
          gap: 10px;
        }

        h2 {
          text-align: center;
          font-weight: 500;
          font-size: 1rem;
        }
        .login-container {
          display: flex;
          gap: 10px;
          padding: 10px;
        }
      `}</style>
    </div>
  )
}
