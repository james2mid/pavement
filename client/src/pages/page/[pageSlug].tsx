import { RichText } from '@/components/RichText'
import { getAllPages, getPageBySlug } from '@/strapi'
import { Container } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import React from 'react'
import { IPage } from 'types/strapi/page'

interface Props {
  page: IPage
}

interface Params extends ParsedUrlQuery {
  pageSlug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  console.log('getStaticPaths')
  const pages = await getAllPages()

  const paths = pages
    .map((x) => x.slug)
    .map((pageSlug) => ({ params: { pageSlug } }))

  console.log('paths', paths)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  console.log('getStaticProps')

  const slug = params?.pageSlug!

  if (!slug) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  const page = await getPageBySlug(slug)

  console.log('page', page)

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: { page },
  }
}

const page: React.FC<Props> = ({ page }) => {
  console.log('viewPage')

  return (
    <Container mt={20} mb={10}>
      <Heading size="3xl" align="center" mb={20}>
        {page.title}
      </Heading>
      <RichText content={page.body} />
    </Container>
  )
}

export default page
