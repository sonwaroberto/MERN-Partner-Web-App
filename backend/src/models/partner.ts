import { InferSchemaType, Schema, model } from 'mongoose'

const partnerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    nom: { type: String, required: true },
    raisonSociale: { type: String, required: true },
    sigle: { type: String, required: true },
    formeJuridique: { type: String, required: true },
    activitePrincipale: { type: String, required: true },
    adresseSiege: { type: String, required: true },
    emailAgentResponsable: { type: String, required: true },
  },
  { timestamps: true }
)

type Partner = InferSchemaType<typeof partnerSchema>

export default model<Partner>('Partner', partnerSchema)
