'use client'

import { useEffect, useState } from 'react'
import { Eye, X, Trash2, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Registration = { id: string; nom: string; prenom: string; telephone: string; message: string; created_at: string }

export default function AdminInscriptionsPage() {
  const [items, setItems] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<Registration | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showClearAllModal, setShowClearAllModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/inscriptions')
        if (!res.ok) throw new Error('Chargement impossible')
        const data = await res.json()
        setItems(data.items || [])
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/inscriptions?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erreur lors de la suppression')
      const data = await res.json()
      setItems(prev => prev.filter(item => item.id !== id))
      toast.success(data.message || 'Inscription supprimée avec succès')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la suppression')
    } finally {
      setDeletingId(null)
    }
  }

  const handleClearAll = async () => {
    try {
      const res = await fetch('/api/admin/inscriptions?action=clear-all', { method: 'DELETE' })
      if (!res.ok) throw new Error('Erreur lors de la suppression')
      const data = await res.json()
      setItems([])
      toast.success(data.message || 'Toutes les inscriptions ont été supprimées')
      setShowClearAllModal(false)
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Inscriptions</h1>
        {items.length > 0 && (
          <button
            onClick={() => setShowClearAllModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash className="w-4 h-4" />
            <span>Vider la liste</span>
          </button>
        )}
      </div>
      {loading ? <p>Chargement...</p> : error ? <p className="text-red-600">{error}</p> : (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Prénom</th>
                <th className="px-4 py-2 text-left">Téléphone</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{r.nom}</td>
                  <td className="px-4 py-2">{r.prenom}</td>
                  <td className="px-4 py-2">{r.telephone}</td>
                  <td className="px-4 py-2 max-w-xs">
                    <div className="flex items-center space-x-2">
                      <div className="truncate flex-1" title={r.message}>
                        {r.message ? (
                          <span className="text-gray-700">
                            {r.message.length > 50 ? `${r.message.substring(0, 50)}...` : r.message}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Aucun message</span>
                        )}
                      </div>
                      {r.message && (
                        <button
                          onClick={() => setSelectedMessage(r)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          title="Voir le message complet"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(r.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deletingId === r.id}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Supprimer cette inscription"
                    >
                      {deletingId === r.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Modal pour afficher le message complet */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Message de {selectedMessage.prenom} {selectedMessage.nom}
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <p className="text-gray-900">{selectedMessage.telephone}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'inscription</label>
                  <p className="text-gray-600">
                    {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t bg-gray-50">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation pour vider toute la liste */}
      {showClearAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <Trash className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Vider toute la liste
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer toutes les inscriptions ? Cette action est irréversible.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowClearAllModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer tout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


