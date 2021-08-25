import cookies from 'next-cookies'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    </div>
  )
}
export async function getServerSideProps(context) {
  const { token } = cookies(context)
  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/career_explorer"
      }
    }
  }
}