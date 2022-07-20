export default function Button({ children, onClick, disabled, rounded }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          border: 0;
          background: #333;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #fff;
          padding: ${rounded ? 0 : "8px 24px"};
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
          width: ${rounded ? "30px" : "auto"};
          height: ${rounded ? "30px" : "auto"};
        }
        button[disabled] {
          opacity: 0.5;
          pointer-events: none;
        }
        button:hover {
          background: #000;
        }
        button > :global(div) {
          margin-top: 4px;
          margin-right: 10px;
          width: 1rem;
        }
        button > :global(span) {
          position: relative;
          top: 8px;
          left: 5.69px;
        }
      `}</style>
    </>
  )
}
