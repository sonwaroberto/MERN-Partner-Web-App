export interface PartnerInput {
  nom: string
  raisonSociale: string
  sigle: string
  formeJuridique: string
  activitePrincipale: string
  adresseSiege: string
  emailAgentResponsable: string
  createdAt: string
  updatedAt: string
}

export interface Partner extends PartnerInput {
  _id: string
}
