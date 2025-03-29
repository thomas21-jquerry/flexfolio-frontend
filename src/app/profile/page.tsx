'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { UserProfile, getUserProfile, updateUserProfile } from '../../services/userServices'
import Image from 'next/image';
import { Session } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async (session: Session | null) => {
          if (!session) {
            setLoading(false)
            return
          }
          try {
            const userProfile = await getUserProfile(session.access_token)
            setProfile(userProfile)
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load profile')
          } finally {
            setLoading(false)
          }
        }
    
        supabase.auth.getSession().then(({ data: { session } }) => {
          fetchProfile(session)
        })
    
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          fetchProfile(session)
        })
        return () => subscription.unsubscribe()
    }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No session found')
      }

      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const updatedProfile: UserProfile = {
        name: formData.get('name') as string,
        company: formData.get('company') as string,
        role: formData.get('role') as string,
        experience: parseInt(formData.get('experience') as string),
        url_link: formData.get('url_link') as string || undefined,
        linkedin_id: formData.get('linkedin_id') as string || undefined,
        github_id: formData.get('github_id') as string || undefined,
        discord_id: formData.get('discord_id') as string || undefined,
        profile_photo: formData.get('profile_photo') as string || undefined,
      };

      const updated = await updateUserProfile(session.access_token, updatedProfile)
      setProfile(updated)
      setIsEditing(false)
      setSuccessMessage('Profile updated successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  // ... [keep existing loading and error handling] ...

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section remains similar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-8">
            <div className="relative w-32 h-32">
              {profile?.profile_photo ? (
                <Image
                  src={profile.profile_photo}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover ring-4 ring-white"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{profile?.name || 'Welcome'}</h1>
              <p className="text-blue-100 mt-2">{profile?.role} at {profile?.company}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* ... [keep error/success messages] ... */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {profile && !isEditing ? (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile.company}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Experience</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile.experience} years</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
                  <div className="space-y-2">
                    {profile.url_link && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-24">Website:</span>
                        <Link href={profile.url_link} target="_blank" className="text-blue-600 hover:underline">
                          {profile.url_link}
                        </Link>
                      </div>
                    )}
                    {profile.linkedin_id && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-24">LinkedIn:</span>
                        <Link href={`https://linkedin.com/in/${profile.linkedin_id}`} target="_blank" className="text-blue-600 hover:underline">
                          {profile.linkedin_id}
                        </Link>
                      </div>
                    )}
                    {profile.github_id && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-24">GitHub:</span>
                        <Link href={`https://github.com/${profile.github_id}`} target="_blank" className="text-blue-600 hover:underline">
                          {profile.github_id}
                        </Link>
                      </div>
                    )}
                    {profile.discord_id && (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-500 w-24">Discord:</span>
                        <span className="text-gray-900">{profile.discord_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* ... [keep edit button] ... */}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={profile?.name}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      defaultValue={profile?.company}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      defaultValue={profile?.role}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      defaultValue={profile?.experience}
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="profile_photo" className="block text-sm font-medium text-gray-700">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      id="profile_photo"
                      name="profile_photo"
                      defaultValue={profile?.profile_photo}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="url_link" className="block text-sm font-medium text-gray-700">
                      Personal Website
                    </label>
                    <input
                      type="url"
                      id="url_link"
                      name="url_link"
                      defaultValue={profile?.url_link}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin_id" className="block text-sm font-medium text-gray-700">
                      LinkedIn Username
                    </label>
                    <input
                      type="text"
                      id="linkedin_id"
                      name="linkedin_id"
                      defaultValue={profile?.linkedin_id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="github_id" className="block text-sm font-medium text-gray-700">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      id="github_id"
                      name="github_id"
                      defaultValue={profile?.github_id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="discord_id" className="block text-sm font-medium text-gray-700">
                      Discord ID
                    </label>
                    <input
                      type="text"
                      id="discord_id"
                      name="discord_id"
                      defaultValue={profile?.discord_id}
                      className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}