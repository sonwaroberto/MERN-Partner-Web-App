import createHttpError from 'http-errors'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import PartnerModel from '../models/partner'
import CreatePartnerBody from '../interfaces'
import UpdatePartnerParams from '../interfaces'
import { assertIsDefined } from '../util/assertIsDefined'

export const getPartners: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId
  try {
    assertIsDefined(authenticatedUserId)
    const partners = await PartnerModel.find({
      userId: authenticatedUserId,
    }).exec()
    res.status(200).json(partners)
  } catch (error) {
    next(error)
  }
}

export const getPartner: RequestHandler = async (req, res, next) => {
  const partnerId = req.params.partnerId
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)

    if (!mongoose.isValidObjectId(partnerId)) {
      throw createHttpError(400, 'Invalid partner id: ' + partnerId)
    }

    const partner = await PartnerModel.findById(partnerId).exec()

    if (!partner) {
      throw createHttpError(404, 'Partner not found')
    }
    if (!partner.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this partner')
    }
    res.status(200).json(partner)
  } catch (error) {
    next(error)
  }
}

export const createPartner: RequestHandler<
  unknown,
  unknown,
  CreatePartnerBody,
  unknown
> = async (req, res, next) => {
  const nom = req.body.nom
  const raisonSociale = req.body.raisonSociale
  const sigle = req.body.sigle
  const formeJuridique = req.body.formeJuridique
  const activitePrincipale = req.body.activitePrincipale
  const adresseSiege = req.body.adresseSiege
  const emailAgentResponsable = req.body.emailAgentResponsable
  const authenticatedUserId = req.session.userId
  try {
    assertIsDefined(authenticatedUserId)
    if (
      !nom ||
      !raisonSociale ||
      !sigle ||
      !formeJuridique ||
      !activitePrincipale ||
      !adresseSiege ||
      !emailAgentResponsable
    ) {
      throw createHttpError(
        400,
        'Un partenaire doit avoir un nom, raisonSociale, formeJuridique, activitePrincipale, adresseSiege et un emailAgentResponsable'
      )
    }
    const newPartner = await PartnerModel.create({
      userId: authenticatedUserId,
      nom,
      raisonSociale,
      sigle,
      formeJuridique,
      activitePrincipale,
      adresseSiege,
      emailAgentResponsable,
    })
    res.status(201).json(newPartner)
  } catch (error) {
    next(error)
  }
}

export const updatePartner: RequestHandler<
  UpdatePartnerParams,
  unknown,
  CreatePartnerBody,
  unknown
> = async (req, res, next) => {
  const partnerId = req.params.partnerId
  const newNom = req.body.nom
  const newRaisonSociale = req.body.raisonSociale
  const newSigle = req.body.sigle
  const newFormeJuridique = req.body.formeJuridique
  const newActivitePrincipale = req.body.activitePrincipale
  const newAdresseSiege = req.body.adresseSiege
  const newEmailAgentResponsable = req.body.emailAgentResponsable
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(partnerId)) {
      throw createHttpError(400, 'Invalid partner id: ' + partnerId)
    }
    if (
      !newNom ||
      !newRaisonSociale ||
      !newSigle ||
      !newFormeJuridique ||
      !newActivitePrincipale ||
      !newAdresseSiege ||
      !newEmailAgentResponsable
    ) {
      throw createHttpError(
        400,
        'Vous ne pouvez modifier un parternaire sans ajouter un nom, raisonSociale, formeJuridique, activitePrincipale, adresseSiege et un emailAgentResponsable'
      )
    }

    const partner = await PartnerModel.findById(partnerId).exec()
    if (!partner) {
      throw createHttpError(404, 'Partner not found')
    }
    if (!partner.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this partner')
    }

    partner.emailAgentResponsable = newEmailAgentResponsable
    partner.nom = newNom
    partner.raisonSociale = newRaisonSociale
    partner.formeJuridique = newFormeJuridique
    partner.adresseSiege = newAdresseSiege
    partner.activitePrincipale = newActivitePrincipale
    partner.sigle = newSigle

    const updatedPartner = await partner.save()

    res.status(200).json(updatedPartner)
  } catch (error) {
    next(error)
  }
}

export const deletePartner: RequestHandler = async (req, res, next) => {
  const partnerId = req.params.partnerId
  const authenticatedUserId = req.session.userId

  try {
    assertIsDefined(authenticatedUserId)
    if (!mongoose.isValidObjectId(partnerId)) {
      throw createHttpError(400, 'Invalid partner id: ' + partnerId)
    }
    const partner = await PartnerModel.findById(partnerId).exec()
    if (!partner) {
      throw createHttpError(404, 'Partner not found: ' + partnerId)
    }
    if (!partner.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this partner')
    }
    await partner.remove()

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
