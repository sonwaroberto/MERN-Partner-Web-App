import { Button, Form, Modal } from 'react-bootstrap'
import { Partner, PartnerInput } from '../models/partner'
import { useForm } from 'react-hook-form'
import * as PartnersApi from '../network/partner_api'
import TextInputField from './form/TextInputField'

interface EditPartnerDialogProps {
  partnerToEdit?: Partner
  onDismiss: () => void
  onPartnerSaved: (partner: Partner) => void
}

const EditPartnerDialog = ({
  partnerToEdit,
  onDismiss,
  onPartnerSaved,
}: EditPartnerDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerInput>({
    defaultValues: {
      nom: partnerToEdit?.nom || '',
      raisonSociale: partnerToEdit?.raisonSociale || '',
      sigle: partnerToEdit?.sigle || '',
      formeJuridique: partnerToEdit?.formeJuridique || '',
      activitePrincipale: partnerToEdit?.activitePrincipale || '',
      adresseSiege: partnerToEdit?.adresseSiege || '',
      emailAgentResponsable: partnerToEdit?.emailAgentResponsable,
      createdAt: partnerToEdit?.createdAt,
      updatedAt: partnerToEdit?.updatedAt,
    },
  })

  async function onSubmit(input: PartnerInput) {
    try {
      let partnerResponse: Partner
      if (partnerToEdit) {
        partnerResponse = await PartnersApi.updatePartner(
          partnerToEdit._id,
          input
        )
      } else {
        partnerResponse = await PartnersApi.createPartner(input)
      }
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
        <Modal.Title>
          {partnerToEdit ? 'Edit partner' : 'Add partner'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="EditPartnerForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputField
            name="nom"
            label="Nom"
            placeholder="Nom"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.nom}
          />
          <TextInputField
            name="sigle"
            label="Sigle"
            placeholder="Sigle"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.sigle}
          />
          <TextInputField
            name="raisonSociale"
            label="raison Sociale"
            placeholder="raison Sociale"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.raisonSociale}
          />
          <TextInputField
            name="formeJuridique"
            label="forme Juridique"
            placeholder="forme Juridique"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.formeJuridique}
          />
          <TextInputField
            name="activitePrincipale"
            label="activite Principale"
            placeholder="activite Principale"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.activitePrincipale}
          />
          <TextInputField
            name="adresseSiege"
            label="adresse Siege"
            placeholder="adresse Siege"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.adresseSiege}
          />
          <TextInputField
            name="emailAgentResponsable"
            label="email Agent Responsable"
            placeholder="email Agent Responsable"
            type="text"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.emailAgentResponsable}
          />
          {/* <TextInputField
            name="emailAgentResponsable"
            label="Text"
            placeholder="text"
            as="textarea"
            rows={5}
            register={register}
            error={errors.emailAgentResponsable}
          /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="EditPartnerForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPartnerDialog
