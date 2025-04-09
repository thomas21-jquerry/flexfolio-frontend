'use client';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {getUserProfileWithId, UserProfile} from '../../../services/userServices'
import Link from 'next/link';

export default function UserPage() {
  const params = useParams();
  const [profile, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const id = params.id!.toString();

  useEffect(()=>{
    const fetchProfile = async (id:string) => {
        try {
          const userProfile = await getUserProfileWithId(id)
          setUser(userProfile)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load profile')
        } finally {
          setLoading(false)
        }
    }
    fetchProfile(id)
  },[])

  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section remains similar */}
      <div className="bg-[url('/bg-3.jpg')] bg-cover bg-center py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-8">
            <div className="relative w-32 h-32">
              
                <Image
                  src={'/profile.png'}
                  alt={profile?.name??"user"}
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                />
              
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

        <div className="rounded-xl shadow-lg overflow-hidden">
          {(
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile?.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile?.company}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile?.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Experience</dt>
                      <dd className="mt-1 text-lg text-gray-900">{profile?.experience} years</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
                  <div className="">
                    {profile?.url_link && (
                      <div className="flex items-center pb-8">
                        <span className="text-sm font-medium text-gray-500 w-24">Website:</span>
                        <Link href={profile.url_link} target="_blank" className="text-blue-600 hover:underline">
                          {profile.url_link}
                        </Link>
                      </div>
                    )}
                    <div className='flex gap-8'>
                    {profile?.linkedin_id && (
                      <div className="flex items-center">
                        
                        <Link href={`${profile?.linkedin_id}`} target="_blank" className="text-blue-600 hover:underline">
                        <Image src="/linkedIn.png" alt="LinkedIn" width={56} height={56} className="" />
                        </Link>
                      </div>
                    )}
                    {profile?.github_id && (
                      <div className="flex items-center">
                        
                        <Link href={`${profile.github_id}`} target="_blank" className="text-blue-600 hover:underline">
                        <Image src="/github.png" alt="github" width={56} height={56} className="" />
                        </Link>
                      </div>
                    )}
                    {profile?.discord_id && (
                      <div className="flex items-center">
                         <Link href={`https://discord.com/users/${profile.discord_id}`} target="_blank" className="text-blue-600 hover:underline">
                        <Image src="/discord.svg" alt="discord" width={56} height={56} className="" />
                        </Link>
                      </div>
                    )}
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
