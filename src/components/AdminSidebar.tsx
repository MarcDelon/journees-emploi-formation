
'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Briefcase, Building2, BarChart3, Settings, LogOut } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Props = {
	user: { name: string; email: string }
	variant?: 'desktop' | 'mobile'
	onNavigate?: () => void
}

export default function AdminSidebar({ user, variant = 'desktop', onNavigate }: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const [spinSettings, setSpinSettings] = useState(false)

	const logout = () => {
		localStorage.removeItem('admin_token')
		localStorage.removeItem('admin_user')
		router.push('/admin')
	}

	const navItem = (href: string, label: string, Icon: any) => {
		const active = pathname?.startsWith(href)
		return (
			<Link
				href={href}
				onClick={onNavigate}
				className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
					active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
				}`}
			>
				<Icon className="w-5 h-5" />
				<span className="font-medium text-sm">{label}</span>
			</Link>
		)
	}

	const rootVisibility = variant === 'desktop' ? 'hidden md:flex' : 'flex md:hidden'

	return (
		<aside className={`w-64 bg-white border-r min-h-screen p-4 ${rootVisibility} flex-col`}
			aria-label="Admin sidebar"
		>
			<div className="flex items-center space-x-3 mb-6">
				<div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
					{user.name?.[0] || 'A'}
				</div>
				<div className="min-w-0">
					<p className="font-semibold truncate">{user.name}</p>
					<p className="text-xs text-gray-500 truncate">{user.email}</p>
				</div>
			</div>
			<nav className="space-y-2 flex-1">
				{navItem('/admin/dashboard', 'Accueil', LayoutDashboard)}
				{navItem('/admin/offres', "Offres d'emploi", Briefcase)}
				{navItem('/admin/partenaires', 'Partenaires', Building2)}
				{navItem('/admin/inscriptions', 'Inscriptions', BarChart3)}
				{navItem('/admin/stats', 'Statistiques', BarChart3)}
			</nav>
			<div className="mt-4 pt-4 border-t">
				<button
					onClick={() => {
						setSpinSettings(true)
						toast('Paramètres en cours de développement')
						setTimeout(() => setSpinSettings(false), 800)
					}}
					className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
				>
					<span className="flex items-center space-x-3">
						<motion.span animate={{ rotate: spinSettings ? 360 : 0 }} transition={{ duration: 0.6 }}>
							<Settings className="w-5 h-5" />
						</motion.span>
						<span className="font-medium text-sm">Paramètres</span>
					</span>
					<LogOut onClick={logout} className="w-5 h-5 text-gray-500 hover:text-red-600 cursor-pointer" />
				</button>
			</div>
		</aside>
	)
}


