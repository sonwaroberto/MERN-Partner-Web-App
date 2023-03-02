import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { LoginCredentials } from '../network/partner_api'
import * as PartnersApi from '../network/partner_api'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styleUtils from '../styles/utils.module.css'
import { useState } from 'react'
import { UnauthorizedError } from '../errors/http_error'

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessfull: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessfull }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>()
  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await PartnersApi.login(credentials)
      onLoginSuccessfull(user)
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setErrorText(err.message)
      } else {
        alert(err)
      }
      console.error(err)
    }
  }
  return (
    <Modal
      show
      onHide={onDismiss}
    >
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className={styleUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
