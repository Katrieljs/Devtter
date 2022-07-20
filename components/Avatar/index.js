export default function Avatar({ alt, src, text }) {
  return (
    <div>
      <img alt={alt} src={src} title={alt} />
      {text && <span>{text}</span>}

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        img {
          border-radius: 9999px;
          height: 49px;
          width: 49px;
          object-fit: cover;
        }
        span {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
