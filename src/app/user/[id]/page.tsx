'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {getUserProfileWithId, UserProfile} from '../../../services/userServices'

export default function UserPage() {
  const params = useParams();
  const [user, setUser] = useState<UserProfile | null>(null)
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
        userId: {id}
      {user?.name}
    </div>
  );
}
