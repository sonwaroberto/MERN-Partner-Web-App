// import logo from './logo.svg'
// import AddPartnerDialog from './components/AddPartnerDialog'
import { useEffect, useState } from 'react'
import LoginModal from './components/LoginModal'
import NavBar from './components/NavBar'
import SignUpModal from './components/SignUpModal'
import { User } from './models/user'
import * as PartnersApi from './network/partner_api'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import PartnerPage from './components/pages/PartnerPage'
import PrivacyPage from './components/pages/PrivacyPage'
import NotFoundPage from './components/pages/NotFoundPage'
import styles from './styles/App.module.css'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginpModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await PartnersApi.getLoggedInUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser()
  }, [])

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => {
            setShowLoginModal(true)
          }}
          onSignUpClicked={() => {
            setShowSignUpModal(true)
          }}
          onLogoutSuccessful={() => {
            setLoggedInUser(null)
          }}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<PartnerPage loggedInUser={loggedInUser} />}
            />
            <Route
              path="/privacy"
              element={<PrivacyPage />}
            />
            <Route
              path="/*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => {
              setShowSignUpModal(false)
            }}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}
          />
        )}
        {showLoginpModal && (
          <LoginModal
            onDismiss={() => {
              setShowLoginModal(false)
            }}
            onLoginSuccessfull={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }}
          />
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
