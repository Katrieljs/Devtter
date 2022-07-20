import ContentLoader from "react-content-loader"

const PlaceholderIMG = (props) => (
  <ContentLoader
    speed={2}
    width={408}
    height={408}
    viewBox="0 0 408 408"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="3" y="0" rx="10" ry="10" width="408" height="400" />
  </ContentLoader>
)

export default PlaceholderIMG
