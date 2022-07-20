import ContentLoader from "react-content-loader"

const PlaceholderFile = (props) => (
  <>
    <div>
      <ContentLoader
        speed={2}
        width={408}
        height={140}
        viewBox="0 0 408 140"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="0" rx="10" ry="10" width="408" height="120" />
      </ContentLoader>
    </div>
    <style jsx>{`
      div {
        margin-top: 15px;
      }
    `}</style>
  </>
)

export default PlaceholderFile
