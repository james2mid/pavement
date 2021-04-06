import { RichText } from '@/components/RichText'
import { getAllPages, getPageBySlug } from '@/strapi/pages'
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
  const pages = await getAllPages()

  const paths = pages
    .map((x) => x.slug)
    .map((pageSlug) => ({ params: { pageSlug } }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
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
  return (
    <Container mt={20} mb={10}>
      {page.title && (
        <Heading size="3xl" align="center" mb={20}>
          {page.title}
        </Heading>
      )}
      <RichText content={page.body} />
    </Container>
  )
}

export default page
