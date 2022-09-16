import { Card, Container, Row, Text } from '@nextui-org/react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <Container>
          <Card css={{ $$cardColor: '$colors$primary' }}>
            <Card.Body>
              <Row justify="center" align="center">
                <Text h6 size={15} color="white" css={{ m: 0 }}>
                  NextUI gives you the best developer experience with all the features
                  you need for building beautiful and modern websites and
                  applications.
                </Text>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  )
}