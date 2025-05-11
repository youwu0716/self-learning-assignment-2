export const config = {
  runtime: 'edge'
};

// Mock repair request records in database
let repairs = [];

export default async function handler(request) {
  if (request.method === 'GET') {
    try {
      return new Response(JSON.stringify(repairs), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'We encountered a technical issue while processing your repair request. Please try again later or contact the property management office directly' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { type, description, location, contactName, contactPhone, preferredTime } = data;

      // Validate required fields
      if (!type || !description || !location || !contactName || !contactPhone) {
        return new Response(JSON.stringify({ error: 'Please provide all required information: repair type, description, location, contact name, and phone number' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Create new repair request
      const newRepair = {
        id: Date.now(),
        type,
        description,
        location,
        contactName,
        contactPhone,
        preferredTime,
        status: 'Pending',
        submitTime: new Date().toISOString(),
      };

      repairs.push(newRepair);

      return new Response(JSON.stringify({
        message: 'Your repair request has been successfully submitted. Our maintenance team will review it and contact you to schedule the repair',
        repair: newRepair
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'We encountered a technical issue while processing your repair request. Please try again later or contact the property management office directly' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Invalid request method. Please use GET to view repair requests or POST to submit a new request' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}