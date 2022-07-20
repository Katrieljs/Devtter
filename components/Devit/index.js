import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { breakpoints } from "../../styles/theme"
import useTimeAgo from "../../hooks/useTimeAgo"
import useDateTimeFormat from "../../hooks/useDateFormat"
import Avatar from "../Avatar"
import Button from "../Button"
import CloseIcon from "../../icons/CloseIcon"
import ArchivoItem from "../ArchivoItem"

export default function Devit({
  avatar,
  content,
  userName,
  userId,
  img,
  file,
  fileName,
  fileSize,
  createdAt,
  id,
  email,
  modal,
  hover,
}) {
  const [modalImg, setModalImg] = useState(false)
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleClick = () => {
    setModalImg(true)
  }

  const handleArticle = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  const handleClose = () => {
    setModalImg(false)
  }

  return (
    <>
      <article onClick={handleArticle}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName || email || userId}</strong>
          {/* <span> {email}</span> */}
          <span> · </span>
          <Link href={`/status/${id}`}>
            <a>
              <time title={createdAtFormated}>{timeago}</time>
            </a>
          </Link>
          <p>{content}</p>
          {file && <ArchivoItem src={file} name={fileName} size={fileSize} />}
          {img && <img onClick={handleClick} src={img} alt={"imagen"} />}
          {modal && modalImg && (
            <div className="modal-container">
              <div className="button-container">
                <Button onClick={handleClose} rounded>
                  <span>
                    <CloseIcon stroke="#fff" width="32" height="32" />
                  </span>
                </Button>
              </div>
              <img className="img-modal" src={img} alt={"imagen"} />
            </div>
          )}
        </section>
      </article>

      <style jsx>{`
        article {
          display: flex;
          padding: 10px 20px;
          border-bottom: 1px solid #eee;
        }
        article:hover {
          background: ${hover ? "#fcf9ff" : "#fff"};
          cursor: ${hover ? "pointer" : "default"};
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          width: 90%;
        }
        img {
          width: 90%;
          border-radius: 10px;
          margin-top: 10px;
          cursor: pointer;
          border: 1.5px solid transparent;
        }
        img:hover {
          border: 1.5px solid #eee;
        }
        .modal-container {
          padding: 0;
          position: absolute;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #1119;
          display: flex;
        }
        .img-modal {
          border-radius: 0;
          margin: 49px;
          object-fit: contain;
          cursor: default;
        }
        .img-modal:hover {
          border-color: transparent;
        }
        .button-container {
          position: absolute;
          top: 15px;
          left: 15px;
        }
        time,
        span {
          color: #555;
          font-size: 14px;
        }
        a {
          color: #555;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        @media (max-width: ${breakpoints.mobile}) {
          .modal-container {
            display: grid;
            place-items: center;
          }
          .img-modal {
            margin: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
