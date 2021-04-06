import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/page/home',
      permanent: true,
    },
  }
}

const index: React.FC = () => {
  return <></>
}

export default index
