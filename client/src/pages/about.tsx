import { RichText } from '@/components/RichText'
import { getAboutPage } from '@/strapi'
import { Container, Heading } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import React from 'react'
import { IAboutPage } from 'types/strapi'

interface Props {
  aboutPage: IAboutPage
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const aboutPage = await getAboutPage()

  return {
    props: { aboutPage },
  }
}

const courses: React.FC<Props> = ({ aboutPage }) => {
  return (
    <Container mt={20} mb={10}>
      <Heading size="3xl" align="center" mb={20}>
        {aboutPage.title}
      </Heading>
      <RichText content={aboutPage.content} />
    </Container>
  )
}

export default courses
