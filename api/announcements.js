export const config = {
  runtime: 'edge'
};

const announcements = [
  {
    id: 1,
    title: 'Notice: Elevator Maintenance',
    date: '2024-02-20',
    content: 'To ensure the safe operation of our elevators, we will conduct routine maintenance this Saturday. Maintenance time: 9:00 AM - 12:00 PM. During this period, the elevators will be temporarily out of service. Please plan your travel accordingly.'
  },
  {
    id: 2,
    title: 'Property Fee Payment Reminder',
    date: '2024-02-18',
    content: 'Dear residents, the Q1 2024 property management fee collection will begin on March 1st. Please make your payment on time. If you have any questions, please contact the property management office.'
  },
  {
    id: 3,
    title: 'Notice: Landscaping Renovation Project',
    date: '2024-02-15',
    content: 'To improve our community environment, we will begin upgrading the landscaping areas next week. The project is expected to last two weeks. There may be some noise during this period. We appreciate your understanding.'
  },
];

export default async function handler(request) {
  // Add CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Sorry, this request method is not supported. Please use GET method to access announcements.' }), {
      status: 405,
      headers
    });
  }

  try {
    return new Response(JSON.stringify(announcements), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'We encountered a technical issue while retrieving the announcements. Please try again later. If the problem persists, contact the property management office.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}