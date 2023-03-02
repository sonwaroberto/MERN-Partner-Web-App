import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import AddEditPartnerDialog from './AddEditPartnerDialog'
import styles from '../styles/PartnersPage.module.css'
import stylesUtils from '../styles/utils.module.css'
import { Partner as PartnerModel } from '../models/partner'
import * as PartnersApi from '../network/partner_api'
import Partner from './Partner'

const PartnersPageLoggedInView = () => {
  const [partners, setPartners] = useState<PartnerModel[]>([])
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false)
  const [partnerToEdit, setPartnerToEdit] = useState<PartnerModel | null>(null)
  const [partnerLoading, setPartnerLoading] = useState(true)
  const [showPartnersLoadingError, setShowPartnersLoadingError] =
    useState(false)

  useEffect(() => {
    async function loadPartners() {
      try {
        setShowPartnersLoadingError(false)
        setPartnerLoading(true)
        const partners = await PartnersApi.fetchPartners()
        setPartners(partners)
      } catch (error) {
        console.error(error)
        setShowPartnersLoadingError(true)
      } finally {
        setPartnerLoading(false)
      }
    }
    loadPartners()
  }, [])

  async function deletePartner(partner: PartnerModel) {
    try {
      await PartnersApi.deletePartner(partner._id)
      setPartners(
        partners.filter(
          (existingPartner) => existingPartner._id !== partner._id
        )
      )
    } catch (e) {
      console.error(e)
    }
  }

  const partnersGrid = (
    <Row
      className={`g-4 ${styles.partnersGrid}`}
      xs={1}
      md={2}
      xl={3}
    >
      {partners.map((partner) => (
        <Col key={partner._id}>
          <Partner
            partner={partner}
            key={partner._id}
            className={styles.partner}
            onDeletePartnerClicked={deletePartner}
            onPartnerClicked={setPartnerToEdit}
          />
        </Col>
      ))}
    </Row>
  )
  return (
    <>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddPartnerDialog(true)}
      >
        <FaPlus />
        Add new Partner
      </Button>
      {partnerLoading && (
        <Spinner
          animation="border"
          variant="primary"
        />
      )}
      {showPartnersLoadingError && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {!partnerLoading && !showPartnersLoadingError && (
        <>
          {partners.length > 0 ? (
            partnersGrid
          ) : (
            <p>You don't have any partners yet</p>
          )}
        </>
      )}
      {showAddPartnerDialog && (
        <AddEditPartnerDialog
          onDismiss={() => setShowAddPartnerDialog(false)}
          onPartnerSaved={(newPartner) => {
            setPartners([...partners, newPartner])
            setShowAddPartnerDialog(false)
          }}
        />
      )}
      {partnerToEdit && (
        <AddEditPartnerDialog
          partnerToEdit={partnerToEdit}
          onDismiss={() => setPartnerToEdit(null)}
          onPartnerSaved={(updatePartner) => {
            setPartners(
              partners.map((existingPartner) =>
                existingPartner._id === updatePartner._id
                  ? updatePartner
                  : existingPartner
              )
            )
            setPartnerToEdit(null)
          }}
        />
      )}
    </>
  )
}

export default PartnersPageLoggedInView
