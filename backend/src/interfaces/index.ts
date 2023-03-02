export default interface CreatePartnerBody {
  nom?: string
  raisonSociale?: string
  sigle?: string
  formeJuridique?: string
  activitePrincipale?: string
  adresseSiege?: string
  emailAgentResponsable?: string
}

export default interface UpdatePartnerParams {
  partnerId: string
}

export default interface SignUpBody {
  username?: string
  email?: string
  password?: string
}
