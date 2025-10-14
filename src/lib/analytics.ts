// Système d'analytics simple avec localStorage
export interface AnalyticsData {
  visitors: number
  applications: number
  lastUpdated: string
}

export const ANALYTICS_KEY = 'site_analytics'

// Initialiser les analytics
export const initAnalytics = (): AnalyticsData => {
  const defaultData: AnalyticsData = {
    visitors: 0,
    applications: 0,
    lastUpdated: new Date().toISOString()
  }
  
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(ANALYTICS_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(defaultData))
  }
  
  return defaultData
}

// Incrémenter le nombre de visiteurs
export const incrementVisitors = (): void => {
  if (typeof window !== 'undefined') {
    const data = initAnalytics()
    data.visitors += 1
    data.lastUpdated = new Date().toISOString()
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
  }
}

// Incrémenter le nombre de candidatures
export const incrementApplications = (): void => {
  if (typeof window !== 'undefined') {
    const data = initAnalytics()
    data.applications += 1
    data.lastUpdated = new Date().toISOString()
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
  }
}

// Récupérer les données analytics
export const getAnalytics = (): AnalyticsData => {
  return initAnalytics()
}

// Réinitialiser les analytics
export const resetAnalytics = (): void => {
  if (typeof window !== 'undefined') {
    const defaultData: AnalyticsData = {
      visitors: 0,
      applications: 0,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(defaultData))
  }
}











