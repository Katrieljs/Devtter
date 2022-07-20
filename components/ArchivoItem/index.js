import { useRouter } from "next/router"

export default function ArchivoItem({ name, src, size }) {
  const router = useRouter()

  const cortarString = () => {
    const position = name.indexOf(".")
    const format = name.slice(position)
    return format
  }

  function bytesToSize() {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (size === 0) return "0 Byte"
    const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)))
    return Math.round(size / Math.pow(1024, i), 2) + " " + sizes[i]
  }

  const handleClick = () => {
    router.push(src)
  }

  return (
    <>
      <section onClick={handleClick}>
        <div className="format">{name && cortarString()}</div>
        <div className="file-info">
          <p>
            <b>Nombre:</b> <a href={src}>{name}</a>
          </p>
          <span>{bytesToSize()}</span>
        </div>
      </section>

      <style jsx>{`
        .format {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 150px;
          height: 100%;
          background: #eee;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        a {
          color: #111;
          text-decoration: none;
        }
        section {
          height: 120px;
          border-radius: 10px;
          display: flex;
          margin-top: 15px;
          cursor: pointer;
          background: #fff;
        }
        section:hover .file-info {
          border: 1px solid #eee;
        }
        .file-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 20px;
          padding-left: 20px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          font-size: 12px;
          border: 1px solid transparent;
        }
      `}</style>
    </>
  )
}
