import { User } from '../models/user'
import * as PartnersApi from '../network/partner_api'
import { Button, Navbar } from 'react-bootstrap'

interface NavBarLoggedInViewProps {
  user: User
  onLogoutSuccessful: () => void
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await PartnersApi.logout()
      onLogoutSuccessful()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">Signed is as : {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  )
}

export default NavBarLoggedInView
