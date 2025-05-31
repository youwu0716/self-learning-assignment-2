export const config = {
  runtime: 'edge'
};

const CORRECT_PASSWORD = process.env.PROFILE_PASSWORD || 'password123';

// Mock user data for profile and password
let userProfile = {
  name: 'John Smith',
  unit: 'Building A-1801',
  phone: '13812345678',
  email: 'zhangsan@example.com',
  residentCount: 3,
  parkingSpace: 'A-123',
  moveInDate: '2022-01-01',
  password: 'password123' // Mock password
};

export default async function handler(request) {
  if (request.method === 'GET') {
    // Return profile data without password
    const { password, ...profileWithoutPassword } = userProfile;
    return new Response(JSON.stringify(profileWithoutPassword), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else if (request.method === 'PUT') {
    try {
      const data = await request.json();
      const { password, ...updatedProfile } = data;

      // Simulate password verification
      if (password !== userProfile.password) {
        return new Response(JSON.stringify({ error: 'Incorrect password' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Update profile data (excluding password)
      userProfile = { ...userProfile, ...updatedProfile };

      return new Response(JSON.stringify({ message: 'Profile updated successfully', profile: userProfile }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}