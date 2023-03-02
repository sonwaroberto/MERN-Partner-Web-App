import React from 'react'
import styles from '../../styles/PartnersPage.module.css'
import { Container } from 'react-bootstrap'
import PartnersPageLoggedInView from '../PartnersPageLoggedInView'
import PartnersPageLoggedOutView from '../PartnersPageLoggedOutView'
import { User } from '../../models/user'

interface PartnerPageProps {
  loggedInUser: User | null
}

export default function PartnerPage({ loggedInUser }: PartnerPageProps) {
  return (
    <Container className={styles.partnersPage}>
      <>
        {loggedInUser ? (
          <PartnersPageLoggedInView />
        ) : (
          <PartnersPageLoggedOutView />
        )}
      </>
    </Container>
  )
}
