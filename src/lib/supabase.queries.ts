'use server'

import { createAdminSupabaseClient } from './supabaseClient'
import { JobOffer, JobSeekerActivity, CompanyActivity, Application, Partner } from './supabase.types'

// Job Offers CRUD
export async function getJobOffers() {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_offers')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as JobOffer[]
}

export async function getJobOfferById(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_offers')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as JobOffer
}

export async function createJobOffer(offer: Omit<JobOffer, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_offers')
    .insert([{ ...offer, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single()
  
  if (error) throw error
  return data as JobOffer
}

export async function updateJobOffer(id: string, offer: Partial<JobOffer>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_offers')
    .update({ ...offer, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as JobOffer
}

export async function deleteJobOffer(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { error } = await supabase
    .from('job_offers')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Job Seeker Activities CRUD
export async function getJobSeekerActivities() {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_seeker_activities')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as JobSeekerActivity[]
}

export async function getJobSeekerActivityById(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_seeker_activities')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as JobSeekerActivity
}

export async function createJobSeekerActivity(activity: Omit<JobSeekerActivity, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_seeker_activities')
    .insert([{ ...activity, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single()
  
  if (error) throw error
  return data as JobSeekerActivity
}

export async function updateJobSeekerActivity(id: string, activity: Partial<JobSeekerActivity>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('job_seeker_activities')
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as JobSeekerActivity
}

export async function deleteJobSeekerActivity(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { error } = await supabase
    .from('job_seeker_activities')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Company Activities CRUD
export async function getCompanyActivities() {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('company_activities')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as CompanyActivity[]
}

export async function getCompanyActivityById(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('company_activities')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as CompanyActivity
}

export async function createCompanyActivity(activity: Omit<CompanyActivity, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('company_activities')
    .insert([{ ...activity, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single()
  
  if (error) throw error
  return data as CompanyActivity
}

export async function updateCompanyActivity(id: string, activity: Partial<CompanyActivity>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('company_activities')
    .update({ ...activity, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as CompanyActivity
}

export async function deleteCompanyActivity(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { error } = await supabase
    .from('company_activities')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Applications CRUD
export async function getApplications() {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Application[]
}

export async function getApplicationById(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Application
}

export async function createApplication(application: Omit<Application, 'id' | 'created_at'>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('applications')
    .insert([{ ...application, created_at: new Date().toISOString() }])
    .select()
    .single()
  
  if (error) throw error
  return data as Application
}

export async function updateApplication(id: string, application: Partial<Application>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { data, error } = await supabase
    .from('applications')
    .update(application)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Application
}

export async function deleteApplication(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Partners CRUD
export async function getPartners() {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Partner[]
}

export async function createPartner(partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  const { data, error } = await supabase
    .from('partners')
    .insert([{ ...partner, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
    .select()
    .single()
  if (error) throw error
  return data as Partner
}

export async function updatePartner(id: string, partner: Partial<Partner>) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  const { data, error } = await supabase
    .from('partners')
    .update({ ...partner, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Partner
}

export async function deletePartner(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  const { error } = await supabase
    .from('partners')
    .delete()
    .eq('id', id)
  if (error) throw error
  return true
}

export async function getPartnerById(id: string) {
  const supabase = createAdminSupabaseClient()
  if (!supabase) {
    throw new Error('Supabase client not initialized')
  }
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Partner
}