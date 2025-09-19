'use client'

import AdminSidebar from '../../components/AdminSidebar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const isLoginPage = pathname === '/admin'

	// Si c'est la page de connexion, ne pas afficher la sidebar
	if (isLoginPage) {
		return (
			<section className="min-h-screen bg-gray-50">
				<main className="max-w-7xl mx-auto p-4 md:p-8">
					{children}
				</main>
			</section>
		)
	}

	// Pour toutes les autres pages admin, afficher avec la sidebar
	return (
		<section className="min-h-screen bg-gray-50">
			{/* Mobile top bar */}
			<div className="md:hidden sticky top-0 z-30 bg-white border-b">
				<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">A</div>
						<span className="font-medium">Admin</span>
					</div>
					<label htmlFor="admin-drawer" className="px-3 py-1.5 rounded-lg border text-sm text-gray-700">Menu</label>
				</div>
			</div>

			{/* Drawer */}
			<input id="admin-drawer" type="checkbox" className="hidden peer" />
			<div className="fixed inset-0 bg-black/30 z-40 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto md:hidden"></div>
			<div className="fixed z-50 top-0 left-0 h-full -translate-x-full peer-checked:translate-x-0 transition-transform md:hidden">
				<div className="h-full shadow-lg">
					<AdminSidebar user={{ name: 'Admin', email: 'admin@example.com' }} variant="mobile" onNavigate={() => { const el = document.getElementById('admin-drawer') as HTMLInputElement | null; if (el) el.checked = false }} />
				</div>
			</div>

			<div className="max-w-7xl mx-auto md:flex">
				{/* Desktop sidebar */}
				<AdminSidebar user={{ name: 'Admin', email: 'admin@example.com' }} variant="desktop" />

				<main className="flex-1 p-4 md:p-8">
					{children}
				</main>
			</div>
		</section>
	)
}