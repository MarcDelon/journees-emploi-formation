import { groq } from 'next-sanity'

export const allOffresQuery = groq`*[_type == "offre"] | order(date desc) {
  _id, titre, entreprise, description, type, domaine, localisation, salaire, date
}`

export const partenairesQuery = groq`*[_type == "partenaire"] | order(coalesce(ordre, 999) asc) {
  _id, nom, logo, site, ordre
}`

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id, title, slug, content, heroImage
}`



