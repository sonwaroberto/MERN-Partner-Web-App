import styles from '../styles/Partner.module.css'
import { Card } from 'react-bootstrap'
import { Partner as PartnerModel } from '../models/partner'
import { formatDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'
import stylesUtils from '../styles/utils.module.css'

interface PartnerProps {
  partner: PartnerModel
  className?: string
  onDeletePartnerClicked: (partner: PartnerModel) => void
  onPartnerClicked: (partner: PartnerModel) => void
}

const Partner = ({
  partner,
  className,
  onDeletePartnerClicked,
  onPartnerClicked,
}: PartnerProps) => {
  const {
    nom,
    raisonSociale,
    sigle,
    formeJuridique,
    activitePrincipale,
    adresseSiege,
    emailAgentResponsable,
    createdAt,
    updatedAt,
  } = partner

  let createdUpdatedText: string
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt)
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt)
  }
  return (
    <Card
      onClick={() => onPartnerClicked(partner)}
      className={`${styles.partnerCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {nom}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeletePartnerClicked(partner)
              e.stopPropagation()
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{activitePrincipale}</Card.Text>
        <Card.Text className={styles.cardText}>{raisonSociale}</Card.Text>
        <Card.Text className={styles.cardText}>{sigle}</Card.Text>
        <Card.Text className={styles.cardText}>{formeJuridique}</Card.Text>
        <Card.Text className={styles.cardText}>{adresseSiege}</Card.Text>
        <Card.Text className={styles.cardText}>
          {emailAgentResponsable}
        </Card.Text>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  )
}
export default Partner
