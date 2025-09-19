'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FileUpload from '@/components/FileUpload'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Plus,
	Search,
	Filter,
	Edit,
	Trash2,
	Eye,
	Globe,
	Building2
} from 'lucide-react'

type Partenaire = {
	id: number
	nom: string
	secteur: string
	logo: string
	description: string
	siteWeb: string
	statut: 'actif' | 'inactif'
}

export default function PartenairesPage() {
	const router = useRouter()
	const [partenaires, setPartenaires] = useState<Partenaire[]>([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')
	const [filterStatus, setFilterStatus] = useState<'all' | 'actif' | 'inactif'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    secteur: '',
    logo: '',
    siteWeb: '',
    description: '',
    statut: 'actif' as 'actif' | 'inactif',
  })
  const [selected, setSelected] = useState<Partenaire | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | 'delete' | null>(null)

	useEffect(() => {
		const token = localStorage.getItem('admin_token')
		if (!token) {
			router.push('/admin')
			return
		}
    fetch('/api/partenaires')
      .then(r => r.json())
      .then(d => {
        const mapped: Partenaire[] = (d.data || []).map((p: any) => ({
          id: p.id,
          nom: p.nom,
          secteur: p.secteur || '',
          logo: p.logo_url || p.logo || '',
          description: p.description || '',
          siteWeb: p.site_web || p.siteWeb || '',
          statut: (p.statut as 'actif' | 'inactif') || 'actif',
        }))
        setPartenaires(mapped)
      })
			.finally(() => setLoading(false))
	}, [router])

	const filtered = partenaires.filter(p => {
		const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.secteur.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesStatus = filterStatus === 'all' || p.statut === filterStatus
		return matchesSearch && matchesStatus
	})

	const getStatusColor = (status: 'actif' | 'inactif') => {
		switch (status) {
			case 'actif':
				return 'bg-green-100 text-green-800'
			case 'inactif':
				return 'bg-gray-100 text-gray-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<>
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-4">
							<Link
								href="/admin/dashboard"
								className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
							>
								<ArrowLeft className="w-5 h-5" />
								<span>Retour au dashboard</span>
							</Link>
							<div className="h-6 w-px bg-gray-300" />
							<div>
								<h1 className="text-xl font-bold text-gray-900">Gestion des Partenaires</h1>
								<p className="text-sm text-gray-500">{filtered.length} partenaire(s) trouvés</p>
							</div>
						</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Partenaire</span>
          </button>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Filtres et Recherche */}
				<div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
					<div className="flex flex-col sm:flex-row gap-4">
						{/* Recherche */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Rechercher par nom ou secteur..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent"
							/>
						</div>

						{/* Filtre par statut */}
						<div className="relative">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value as 'all' | 'actif' | 'inactif')}
								className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent appearance-none bg-white"
							>
								<option value="all">Tous les statuts</option>
								<option value="actif">Actif</option>
								<option value="inactif">Inactif</option>
							</select>
						</div>
					</div>
				</div>

				{/* Liste des Partenaires */}
				{loading ? (
					<div className="bg-white rounded-xl shadow-sm border p-8 text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
						<p className="text-gray-600">Chargement des partenaires...</p>
					</div>
				) : (
					<div className="grid gap-6">
						{filtered.map((p, index) => (
							<motion.div
								key={p.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
							>
								<div className="p-6">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-3 mb-2">
												{/* Logo */}
                                                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
													{p.logo ? (
														// eslint-disable-next-line @next/next/no-img-element
                                                        <img src={p.logo} alt={p.nom} className="w-full h-full object-cover" />
													) : (
														<span className="text-sm font-semibold text-gray-600">{p.nom[0]}</span>
													)}
												</div>
                                                <h3 className="text-lg font-semibold text-gray-900">{p.nom}</h3>
												<span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(p.statut)}`}>{p.statut === 'actif' ? 'Actif' : 'Inactif'}</span>
											</div>

											<div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
												<div className="flex items-center space-x-1">
													<Building2 className="w-4 h-4" />
													<span>{p.secteur}</span>
												</div>
												{p.siteWeb && (
													<div className="flex items-center space-x-1">
														<Globe className="w-4 h-4" />
														<a href={p.siteWeb} target="_blank" className="text-blue-600 hover:underline truncate max-w-[240px]">{p.siteWeb}</a>
													</div>
												)}
											</div>

											<p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
										</div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={()=>{ setSelected(p); setMode('view'); setIsModalOpen(true); }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={()=>{ setSelected(p); setMode('edit'); setIsModalOpen(true); setForm({ nom: p.nom, secteur: p.secteur, logo: p.logo, siteWeb: p.siteWeb, description: p.description, statut: p.statut }); }}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={()=>{ setSelected(p); setMode('delete'); setIsModalOpen(true); }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}

                {filtered.length === 0 && !loading && (
					<div className="bg-white rounded-xl shadow-sm border p-8 text-center">
						<p className="text-gray-600 mb-4">Aucun partenaire trouvé</p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Créer le premier partenaire</span>
                    </button>
					</div>
				)}
			</div>
		</div>

    {/* Modales (ajout / vue / édition / suppression) */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
        <div className="relative bg-white w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-xl shadow-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {mode === 'edit' ? 'Modifier le partenaire' : mode === 'view' ? 'Détails du partenaire' : mode === 'delete' ? 'Supprimer le partenaire' : 'Ajouter un partenaire'}
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">✕</button>
          </div>
          {mode === 'view' && selected && (
            <div className="space-y-4">
              <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {selected.logo ? (<img src={selected.logo} alt={selected.nom} className="w-full h-full object-contain" />) : <span className="text-gray-400">Aucun logo</span>}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Nom:</span> <span className="font-medium">{selected.nom}</span></div>
                <div><span className="text-gray-500">Statut:</span> <span className="font-medium">{selected.statut}</span></div>
                <div><span className="text-gray-500">Secteur:</span> <span className="font-medium">{selected.secteur}</span></div>
                <div className="col-span-2"><span className="text-gray-500">Site web:</span> <a href={selected.siteWeb} target="_blank" className="text-blue-600 hover:underline break-all">{selected.siteWeb}</a></div>
                <div className="col-span-2"><span className="text-gray-500">Description:</span><p className="mt-1">{selected.description}</p></div>
              </div>
            </div>
          )}
          {(mode === 'edit' || mode === null) && (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input value={form.nom} onChange={e=>setForm({...form, nom: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secteur</label>
              <input value={form.secteur} onChange={e=>setForm({...form, secteur: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              <FileUpload
                fileType="image"
                acceptedTypes={["image/*"]}
                maxSize={10}
                onFileSelect={async (file)=>{
                  // Upload via route /api/upload (existe déjà dans le projet)
                  const body = new FormData();
                  body.append('file', file);
                  const res = await fetch('/api/upload', { method: 'POST', body });
                  const data = await res.json();
                  if (!res.ok || !data?.url) throw new Error('Upload échoué');
                  setForm(prev=>({ ...prev, logo: data.url }));
                }}
                onFileRemove={()=> setForm(prev=>({ ...prev, logo: '' }))}
              />
              {form.logo && (
                <p className="mt-1 text-xs text-gray-500 break-all">URL: {form.logo}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Site web</label>
              <input value={form.siteWeb} onChange={e=>setForm({...form, siteWeb: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description / Slogan</label>
              <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full border rounded-lg px-3 py-2" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Statut</label>
              <select value={form.statut} onChange={e=>setForm({...form, statut: e.target.value as any})} className="w-full border rounded-lg px-3 py-2">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
          </div>
          )}
          {mode === 'delete' && selected && (
            <div className="text-sm text-gray-700">
              Voulez-vous vraiment supprimer « {selected.nom} » ? Cette action est irréversible.
            </div>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border">Annuler</button>
            {mode === 'delete' && selected && (
              <button
                disabled={saving}
                onClick={async ()=>{
                  try {
                    setSaving(true)
                    const res = await fetch(`/api/partenaires/${selected.id}`, { method: 'DELETE' })
                    const data = await res.json()
                    if (!res.ok || !data?.success) throw new Error(data?.error || 'Suppression impossible')
                    setPartenaires(prev => prev.filter(x => x.id !== selected.id))
                    setIsModalOpen(false)
                    setSelected(null)
                  } catch (e) {
                    console.error(e)
                    alert('Erreur lors de la suppression')
                  } finally { setSaving(false) }
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-60"
              >
                {saving ? 'Suppression...' : 'Supprimer'}
              </button>
            )}
            {(mode === null) && (
              <button
                disabled={saving}
                onClick={async ()=>{
                  try {
                    setSaving(true)
                    const res = await fetch('/api/partenaires', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        nom: form.nom,
                        secteur: form.secteur,
                        logo_url: form.logo,
                        site_web: form.siteWeb,
                        description: form.description,
                        statut: form.statut,
                      }),
                    })
                    const data = await res.json()
                    if (!res.ok || !data?.success) throw new Error(data?.error || 'Erreur lors de la création')
                    const created = data.data
                    const mapped: Partenaire = {
                      id: created.id,
                      nom: created.nom,
                      secteur: created.secteur || '',
                      logo: created.logo_url || created.logo || '',
                      description: created.description || '',
                      siteWeb: created.site_web || created.siteWeb || '',
                      statut: (created.statut as 'actif' | 'inactif') || 'actif',
                    }
                    setPartenaires(prev => [mapped, ...prev])
                    setIsModalOpen(false)
                    setForm({ nom: '', secteur: '', logo: '', siteWeb: '', description: '', statut: 'actif' })
                  } catch (e) {
                    console.error(e)
                    alert('Impossible de créer le partenaire')
                  } finally {
                    setSaving(false)
                  }
                }}
                className="px-4 py-2 rounded-lg bg-event-blue text-white disabled:opacity-60"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            )}
            {mode === 'edit' && selected && (
              <button
                disabled={saving}
                onClick={async ()=>{
                  try {
                    setSaving(true)
                    const res = await fetch(`/api/partenaires/${selected.id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        nom: form.nom,
                        secteur: form.secteur,
                        logo_url: form.logo,
                        site_web: form.siteWeb,
                        description: form.description,
                        statut: form.statut,
                      }),
                    })
                    const data = await res.json()
                    if (!res.ok || !data?.success) throw new Error(data?.error || 'Erreur lors de la mise à jour')
                    const updated = data.data
                    setPartenaires(prev => prev.map(x => x.id === selected.id ? {
                      id: updated.id,
                      nom: updated.nom,
                      secteur: updated.secteur || '',
                      logo: updated.logo_url || updated.logo || '',
                      description: updated.description || '',
                      siteWeb: updated.site_web || updated.siteWeb || '',
                      statut: (updated.statut as 'actif' | 'inactif') || 'actif',
                    } : x))
                    setIsModalOpen(false)
                    setSelected(null)
                  } catch (e) {
                    console.error(e)
                    alert('Impossible de mettre à jour le partenaire')
                  } finally { setSaving(false) }
                }}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-60"
              >
                {saving ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
            )}
          </div>
        </div>
      </div>
    )}
		</>
  )
}

