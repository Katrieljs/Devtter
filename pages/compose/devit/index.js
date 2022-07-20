import Button from "../../../components/Button"
import { fonts } from "../../../styles/theme"
import { useEffect, useState } from "react"
import useUser from "../../../hooks/useUser"
import { addDevit, uploadImage, uploadFile } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "../../../components/Avatar"
import Header from "../../../components/Header"
import ArrowLeft from "../../../icons/ArrowLeft"
import Link from "next/link"
import CloseIcon from "../../../icons/CloseIcon"
import PlaceholderIMG from "../../../components/PlaceholderIMG"
import PlaceholderFile from "../../../components/PlaceholderFile"
import Counter from "../../../components/Counter"
import ArchivoItem from "../../../components/ArchivoItem"
import Nav from "../../../components/Nav"

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOAD: 2,
  COMPLETE: 3,
}

export default function ComposeDevitPage() {
  const [message, setMessage] = useState("")
  const [buttonMessage, setButtonMessage] = useState("Devitear")

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [taskFile, setTaskFile] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [isLoadingIMG, setIsLoadingIMG] = useState(false)
  const [isLoadingFile, setIsLoadingFile] = useState(false)
  const [fileURL, setFileURL] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [fileSize, setFileSize] = useState(null)

  const user = useUser()
  const router = useRouter()

  const maxLength = 300

  const isButtonDisabled = !message.length || message.length > maxLength

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        setIsLoadingIMG(true)
      }
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
        setIsLoadingIMG(false)
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task, isLoadingIMG])

  useEffect(() => {
    if (taskFile) {
      const onProgress = () => {
        setIsLoadingFile(true)
      }
      const onError = () => {}
      const onComplete = () => {
        console.log(taskFile)
        taskFile.snapshot.ref.getDownloadURL().then(setFileURL)
        setIsLoadingFile(false)
      }

      taskFile.on("state_changed", onProgress, onError, onComplete)
    }
  }, [taskFile])

  const handleSubmit = (e) => {
    e.preventDefault()
    setButtonMessage("Deviteando...")
    addDevit({
      avatar: user.avatar,
      content: message,
      img: imgURL,
      file: fileURL,
      fileName,
      fileSize,
      userId: user.id,
      userName: user.username,
      email: user.email,
    }).then(() => {
      setButtonMessage("Deviteado")
      router.push("/home")
    })
  }

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const handleClickImage = () => {
    setImgURL(null)
    setIsLoadingIMG(false)
  }

  const handleClickFile = () => {
    setFileURL(null)
    setIsLoadingFile(false)
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const handleChangeFileFile = (e) => {
    const file = e.target.files[0]
    const taskFile = uploadFile(file)
    console.log(file)
    setFileName(file.name)
    setTaskFile(taskFile)
    setFileSize(file.size)
  }

  return (
    <>
      <Head>
        <title>Devitear / Devter</title>
      </Head>

      <Header>
        <Link href="/home">
          <a>
            <ArrowLeft stroke="#111" width="32" height="32" />
          </a>
        </Link>
      </Header>

      <section className="form-container">
        <section className="avatar-container">
          {user && <Avatar src={user.avatar} alt={user.username} />}
        </section>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Que está pasando?"
            onChange={handleChange}
            value={message}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></textarea>

          <div className="options-container">
            <div className="send-container">
              <Button disabled={isButtonDisabled}>{buttonMessage}</Button>
            </div>
            <div className="image-upload">
              <label htmlFor="file-input">
                <img
                  src="/Picture.svg"
                  alt="Subir una foto"
                  title="Subir una foto"
                />
              </label>

              <input id="file-input" type="file" onChange={handleChangeFile} />
            </div>

            <div className="file-upload">
              <label htmlFor="file-input-file">
                <img
                  src="/Paperclip.svg"
                  alt="Subir una foto"
                  title="Subir una foto"
                />
              </label>
              <input
                id="file-input-file"
                type="file"
                onChange={handleChangeFileFile}
              />
            </div>
            <Counter characters={message.length} maxLength={maxLength} />
          </div>
          <div className="preview-container">
            {isLoadingIMG && (
              <section className="placeholder-container">
                <div className="button-container">
                  <Button rounded disabled>
                    <span>
                      <CloseIcon stroke="#111" width="32" height="32" />
                    </span>
                  </Button>
                </div>
                <PlaceholderIMG />
              </section>
            )}

            {isLoadingIMG === false && imgURL && (
              <section className="image-preview">
                <div className="button-container">
                  <Button onClick={handleClickImage} rounded>
                    <span>
                      <CloseIcon stroke="#111" width="32" height="32" />
                    </span>
                  </Button>
                </div>
                <img src={imgURL} alt={imgURL} />
              </section>
            )}
            {isLoadingFile && (
              <section className="placeholder-container">
                <div className="button-container">
                  <Button rounded disabled>
                    <span>
                      <CloseIcon stroke="#111" width="32" height="32" />
                    </span>
                  </Button>
                </div>
                <PlaceholderFile />
              </section>
            )}
            {isLoadingFile === false && fileURL && (
              <section className="image-preview">
                <div className="button-container">
                  <Button onClick={handleClickFile} rounded>
                    <span>
                      <CloseIcon stroke="#111" width="32" height="32" />
                    </span>
                  </Button>
                </div>
                <ArchivoItem src={fileURL} name={fileName} size={fileSize} />
              </section>
            )}
          </div>
        </form>
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
        form {
          padding: 10px;
          width: 100%;
          display: grid;
        }
        textarea {
          width: 100%;
          height: 150px;
          padding: 10px;
          padding-top: 5px;
          resize: none;
          font-family: ${fonts.base};
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "2px dashed #999fff"
            : "2px dashed transparent"};
          border-radius: 10px;
        }
        textarea:focus {
          outline: none;
        }
        textarea:hover {
          outline: none;
        }
        .image-upload > input,
        .file-upload > input {
          display: none;
        }
        .image-upload img,
        .file-upload img {
          cursor: pointer;
          width: 35px;
          height: 35px;
        }
        .file-upload img {
          width: 30px;
          height: 30px;
        }
        .image-upload img:hover,
        .file-upload img:hover {
          background: radial-gradient(#eee8 15%, transparent 16%);
          background-size: 155px 155px;
          background-position: center;
        }
        .file-upload img:hover {
          background-size: 135px 135px;
        }
        section {
          position: relative;
        }
        .image-preview,
        .placeholder-container {
          margin-top: 15px;
          margin-left: 15px;
        }
        .form-container {
          padding-top: 5px;
          display: flex;
          align-items: start;
        }
        .avatar-container {
          padding-top: 15px;
          padding-left: 20px;
        }
        .button-container {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        img {
          display: block;
          margin: auto;
          width: 100%;
          border-radius: 10px;
        }
        .options-container {
          display: flex;
          gap: 10px;
          padding-left: 15px;
          align-items: center;
        }
        .preview-container {
          min-height: 450px;
        }
      `}</style>
    </>
  )
}
