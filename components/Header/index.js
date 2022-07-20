export default function Header({ children }) {
  return (
    <>
      <header>{children}</header>
      <style jsx>{`
        header {
          display: flex;
          background: #fff9;
          backdrop-filter: blur(5px);
          align-items: center;
          border-bottom: 1px solid #eee;
          height: 47px;
          position: sticky;
          z-index: 1000;
          top: 0;
          width: 100%;
        }
      `}</style>
    </>
  )
}
