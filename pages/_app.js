import AppLayout from "../components/App_layout"
import useDeviceDetect from "../hooks/useDevice"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  const { isMobile } = useDeviceDetect()

  return (
    <>
      {isMobile ? (
        <Component {...pageProps} />
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </>
  )
}

export default MyApp
