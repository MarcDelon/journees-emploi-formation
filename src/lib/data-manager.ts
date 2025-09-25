import type { OffreEmploi, TemoignageVideo, PhotoEdition, Partenaire, Actualite, Configuration } from './types'

type Id = string

const makeId = (): Id => Math.random().toString(36).slice(2)

class InMemoryDataManager {
	private offres: OffreEmploi[] = []
	private entreprises: Partenaire[] = [
		{
			id: makeId(),
			nom: 'TechStart SARL',
			logoUrl: '',
			description: "Entreprise innovante spécialisée dans le numérique et l'accompagnement des TPE/PME.",
			siteWeb: 'https://techstart.example',
			type: 'or',
			active: true,
			ordre: 1,
		},
		{
			id: makeId(),
			nom: 'Centre de Formation Pro',
			logoUrl: '',
			description: 'Organisme de formation professionnelle certifié.',
			siteWeb: 'https://cfp.example',
			type: 'argent',
			active: true,
			ordre: 2,
		},
		{
			id: makeId(),
			nom: 'Digicom Agency',
			logoUrl: '',
			description: 'Agence marketing et communication digitale.',
			siteWeb: 'https://digicom.example',
			type: 'bronze',
			active: false,
			ordre: 3,
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
			logoUrl: payload.logoUrl ?? '',
			description: payload.description ?? '',
			siteWeb: payload.siteWeb ?? '#',
			type: (payload.type as Partenaire['type']) ?? 'bronze',
			active: payload.active ?? true,
			ordre: payload.ordre ?? 0,
		}
		this.entreprises.unshift(partenaire)
		return partenaire
	}

	public getActualites(): Actualite[] {
		return this.evenements
	}

	public addActualite(payload: Partial<Actualite>): Actualite {
		const actualite: Actualite = {
			id: makeId(),
			titre: payload.titre ?? 'Sans titre',
			contenu: payload.contenu ?? '',
			datePublication: payload.datePublication ?? new Date().toISOString(),
			imageUrl: payload.imageUrl,
			active: payload.active ?? true,
			ordre: payload.ordre ?? 0,
		}
		this.evenements.unshift(actualite)
		return actualite
	}

	public updateActualite(id: string, payload: Partial<Actualite>): Actualite | null {
		const index = this.evenements.findIndex(a => a.id === id)
		if (index === -1) return null
		this.evenements[index] = { ...this.evenements[index], ...payload }
		return this.evenements[index]
	}

	public deleteActualite(id: string): boolean {
		const index = this.evenements.findIndex(a => a.id === id)
		if (index === -1) return false
		this.evenements.splice(index, 1)
		return true
	}

	public getPhotos(): PhotoEdition[] {
		return this.photos
	}

	public addPhoto(payload: Partial<PhotoEdition>): PhotoEdition {
		const photo: PhotoEdition = {
			id: makeId(),
			titre: payload.titre ?? '',
			description: payload.description ?? '',
			imageUrl: payload.imageUrl ?? '',
			edition: payload.edition ?? '2025',
			categorie: payload.categorie ?? 'general',
			datePublication: payload.datePublication ?? new Date().toISOString(),
			active: payload.active ?? true,
			ordre: payload.ordre ?? 0
		}
		this.photos.unshift(photo)
		return photo
	}

	public updatePhoto(id: string, payload: Partial<PhotoEdition>): PhotoEdition | null {
		const index = this.photos.findIndex(p => p.id === id)
		if (index === -1) return null
		this.photos[index] = { ...this.photos[index], ...payload }
		return this.photos[index]
	}

	public deletePhoto(id: string): boolean {
		const index = this.photos.findIndex(p => p.id === id)
		if (index === -1) return false
		this.photos.splice(index, 1)
		return true
	}

	public getConfiguration(): Configuration | null {
		return this.configuration
	}

	public updateConfiguration(payload: Partial<Configuration>): Configuration {
		const defaultConfig: Configuration = {
			id: makeId(),
			titreSite: 'Journées de l\'Emploi et de la Formation',
			descriptionSite: '6e édition des Journées de l\'Emploi et de la Formation',
			emailContact: 'journeemploiformation@gmail.com',
			telephoneContact: '698-704-167',
			adresse: 'Douala, Cameroun',
			reseauxSociaux: {},
			editionActuelle: '6e Édition',
			dateEvenement: '12-14 novembre 2025',
			lieuEvenement: 'Douala'
		}
		
		this.configuration = {
			...defaultConfig,
			...this.configuration,
			...payload
		}
		return this.configuration
	}

	public getTemoignages(): TemoignageVideo[] {
		return this.temoignages
	}

	public addTemoignage(payload: Partial<TemoignageVideo>): TemoignageVideo {
		const temoignage: TemoignageVideo = {
			id: makeId(),
			titre: payload.titre ?? '',
			nom: payload.nom ?? 'Anonyme',
			poste: payload.poste ?? '',
			entreprise: payload.entreprise ?? '',
			videoUrl: payload.videoUrl ?? '',
			thumbnailUrl: payload.thumbnailUrl,
			description: payload.description ?? '',
			datePublication: payload.datePublication ?? new Date().toISOString(),
			active: payload.active ?? true,
			ordre: payload.ordre ?? 0
		}
		this.temoignages.unshift(temoignage)
		return temoignage
	}
}

export const dataManager = new InMemoryDataManager()



