import { Button, Form, Modal } from 'react-bootstrap'
import { Partner, PartnerInput } from '../models/partner'
import { useForm } from 'react-hook-form'
import * as PartnersApi from '../network/partner_api'

interface AddPartnerDialogProps {
  onDismiss: () => void
  onPartnerSaved: (partner: Partner) => void
}

const AddPartnerDialog = ({
  onDismiss,
  onPartnerSaved,
}: AddPartnerDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput>()

  async function onSubmit(input: PartnerInput) {
    try {
      console.log(input)
      const partnerResponse = await PartnersApi.createPartner(input)
      onPartnerSaved(partnerResponse)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal
      show
      onHide={onDismiss}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Partner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="addPartnerForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              isInvalid={!!errors.nom}
              {...register('nom', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nom?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>sigle</Form.Label>
            <Form.Control
              type="text"
              placeholder="sigle"
              isInvalid={!!errors.sigle}
              {...register('sigle', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sigle?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>raison Sociale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Raison Sociale"
              isInvalid={!!errors.raisonSociale}
              {...register('raisonSociale', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.raisonSociale?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>forme Juridique</Form.Label>
            <Form.Control
              type="text"
              placeholder="forme Juridique"
              isInvalid={!!errors.formeJuridique}
              {...register('formeJuridique', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.formeJuridique?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Activite Principale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Activite Principale"
              isInvalid={!!errors.activitePrincipale}
              {...register('activitePrincipale', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.activitePrincipale?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>adresse Siege</Form.Label>
            <Form.Control
              type="text"
              placeholder="adresse Siege"
              isInvalid={!!errors.adresseSiege}
              {...register('adresseSiege', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.adresseSiege?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>email Agent Responsable</Form.Label>
            <Form.Control
              type="text"
              placeholder="email Agent Responsable"
              isInvalid={!!errors.emailAgentResponsable}
              {...register('emailAgentResponsable', { required: 'Required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.emailAgentResponsable?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addPartnerForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddPartnerDialog
