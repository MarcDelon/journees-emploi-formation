import type { OffreEmploi, TemoignageVideo, PhotoEdition, Partenaire, Actualite, Configuration } from './types'

type Id = string

const makeId = (): Id => Math.random().toString(36).slice(2)

class InMemoryDataManager {
	private offres: OffreEmploi[] = []
	private entreprises: Partenaire[] = [
		{
			id: makeId(),
			nom: 'TechStart SARL',
			logo: '',
			description: "Entreprise innovante spécialisée dans le numérique et l'accompagnement des TPE/PME.",
			secteur: 'Technologie',
			siteWeb: 'https://techstart.example',
			statut: 'actif',
		},
		{
			id: makeId(),
			nom: 'Centre de Formation Pro',
			logo: '',
			description: 'Organisme de formation professionnelle certifié.',
			secteur: 'Formation',
			siteWeb: 'https://cfp.example',
			statut: 'actif',
		},
		{
			id: makeId(),
			nom: 'Digicom Agency',
			logo: '',
			description: 'Agence marketing et communication digitale.',
			secteur: 'Marketing',
			siteWeb: 'https://digicom.example',
			statut: 'inactif',
		},
	]
	private evenements: Actualite[] = []
	private temoignages: TemoignageVideo[] = []
	private photos: PhotoEdition[] = []
	private configuration: Configuration | null = null

	public getOffres(): OffreEmploi[] {
		return this.offres
	}

	public addOffre(payload: Partial<OffreEmploi>): OffreEmploi {
		const now = new Date().toISOString()
		const offre: OffreEmploi = {
			id: makeId(),
			titre: payload.titre ?? 'Sans titre',
			entreprise: payload.entreprise ?? 'Entreprise',
			lieu: payload.lieu ?? '',
			typeContrat: (payload.typeContrat as OffreEmploi['typeContrat']) ?? 'CDI',
			description: payload.description ?? '',
			competences: payload.competences ?? [],
			salaire: payload.salaire,
			datePublication: payload.datePublication ?? now,
			dateExpiration: payload.dateExpiration ?? now,
			contact: payload.contact ?? { email: 'contact@example.com', nom: 'Contact' },
			active: payload.active ?? true,
			imageUrl: payload.imageUrl,
		}
		this.offres.unshift(offre)
		return offre
	}

	public getPartenaires(): Partenaire[] {
		return this.entreprises
	}

	public addPartenaire(payload: Partial<Partenaire>): Partenaire {
		const partenaire: Partenaire = {
			id: makeId(),
			nom: payload.nom ?? 'Partenaire',
			logo: payload.logo ?? '',
			description: payload.description ?? '',
			secteur: payload.secteur ?? 'Général',
			siteWeb: payload.siteWeb ?? '#',
			statut: (payload.statut as Partenaire['statut']) ?? 'actif',
		}
		this.entreprises.unshift(partenaire)
		return partenaire
	}
}

export const dataManager = new InMemoryDataManager()



