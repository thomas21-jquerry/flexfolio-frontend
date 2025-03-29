export interface UserProfile {
    name: string;
    company: string;
    role: string;
    experience: number;
    url_link?: string;
    linkedin_id?: string;
    github_id?: string;
    discord_id?: string;
    profile_photo?: string;
  }
  
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  export async function getUserProfile(token: string): Promise<UserProfile> {
    const response = await fetch(`${baseURL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
  
    return response.json();
  }
  
  export async function updateUserProfile(token: string, profile: UserProfile): Promise<UserProfile> {
    console.log(profile, "profile")
    const response = await fetch(`${baseURL}/users/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
  
    return response.json();
  } 