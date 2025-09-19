export type OffreEmploi = {
	id: number
	titre: string
	entreprise: string
	lieu: string
	type: string
	salaire?: string
	description: string
	competences: string[]
	datePublication: string
	statut: 'active' | 'brouillon'
}

export type Partenaire = {
	id: number
	nom: string
	secteur: string
	logo: string
	description: string
	siteWeb: string
	statut: 'actif' | 'inactif'
}

const offresSeed: OffreEmploi[] = [
	{
		id: 1,
		titre: 'Développeur Frontend React',
		entreprise: 'TechCorp Douala',
		lieu: 'Douala',
		type: 'CDD',
		salaire: 'Selon profil',
		description: 'Participation au développement d\'interfaces modernes en React.',
		competences: ['React', 'TypeScript'],
		datePublication: new Date().toISOString().split('T')[0],
		statut: 'active'
	}
]

const partenairesSeed: Partenaire[] = [
	{
		id: 1,
		nom: 'Association Égalité Pour Tous',
		secteur: 'Associatif',
		logo: '/images/logo-evenement.jpg.jpeg',
		description: 'Partenaire principal des Journées de l\'Emploi et de la Formation',
		siteWeb: 'https://egalitepourtous.example',
		statut: 'actif'
	}
]

let offres: OffreEmploi[] = [...offresSeed]
let partenaires: Partenaire[] = [...partenairesSeed]

export const getOffresEmploi = async (): Promise<OffreEmploi[]> => {
	return offres
}

export const getPartenaires = async (): Promise<Partenaire[]> => {
	return partenaires
}









