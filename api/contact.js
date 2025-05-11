// API Route Configuration
// Using Edge Runtime for better performance
export const config = {
  runtime: 'edge'
};

// Mock message storage in database
// Temporarily store messages in array, should use database in production
let messages = [];

// Handle message-related API requests
// Only supports POST method for submitting new messages
export default async function handler(request) {
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { name, contact, subject, message } = data;

      // Validate required fields
      // Ensure user provides all necessary information
      if (!name || !contact || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields (name, contact, subject, and message) are required. Please fill in all information so we can assist you better' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const newMessage = {
        id: Date.now(),
        name,
        contact,
        subject,
        message,
        status: 'Pending',
        submitTime: new Date().toISOString(),
      };

      messages.push(newMessage);

      return new Response(JSON.stringify({
        message: 'Thank you for contacting us. Your message has been successfully received. Our team will review it and respond to you as soon as possible',
        data: newMessage
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'We apologize, but we encountered a technical issue while processing your message. Please try again later or contact our property management office directly if the issue persists' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Invalid request method. Please use POST method to submit your message' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}