import ContentLoader from "react-content-loader"

const PlaceholderItem = (props) => {
  return (
    <>
      <section>
        <ContentLoader
          speed={2}
          width={"100%"}
          height={110}
          viewBox="0 0 520 110"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="117" y="151" rx="3" ry="3" width="88" height="6" />
          <rect x="203" y="145" rx="3" ry="3" width="52" height="6" />
          <rect x="81" y="149" rx="3" ry="3" width="410" height="6" />
          <rect x="125" y="128" rx="3" ry="3" width="407" height="6" />
          <circle cx="185" cy="202" r="4" />
          <circle cx="168" cy="21" r="2" />
          <rect x="74" y="40" rx="0" ry="0" width="368" height="9" />
          <circle cx="40" cy="35" r="25" />
          <rect x="74" y="59" rx="0" ry="0" width="368" height="9" />
          <rect x="74" y="15" rx="0" ry="0" width="80" height="12" />
          <rect x="182" y="15" rx="0" ry="0" width="65" height="11" />
        </ContentLoader>
        <div />
      </section>
      <style jsx>{`
        section {
          width: 100%;
        }
        div {
          width: 100%:
          height: 0.5px;
          border-bottom: 1px solid #ecebeb;
        }
      `}</style>
    </>
  )
}

export default PlaceholderItem
