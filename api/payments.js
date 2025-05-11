export const config = {
  runtime: 'edge'
};

// Mock payment records in database
const payments = [
  {
    id: 1,
    type: 'Property Fee',
    amount: 1200,
    period: 'Q1 2024',
    dueDate: '2024-03-31',
    status: 'Unpaid'
  },
  {
    id: 2,
    type: 'Parking Fee',
    amount: 300,
    period: 'March 2024',
    dueDate: '2024-03-31',
    status: 'Paid'
  },
  {
    id: 3,
    type: 'Utilities',
    amount: 258.50,
    period: 'February 2024',
    dueDate: '2024-02-29',
    status: 'Paid'
  }
];

export default async function handler(request) {
  if (request.method === 'GET') {
    try {
      return new Response(JSON.stringify(payments), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'We encountered a technical issue while processing your payment. Please try again later or contact our property management office for assistance' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { paymentId, amount } = data;

      // Validate payment data
      const payment = payments.find(p => p.id === paymentId);
      if (!payment) {
        return new Response(JSON.stringify({ error: 'Payment record not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (payment.amount !== amount) {
        return new Response(JSON.stringify({ error: 'Payment amount does not match' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      // Mock payment processing
      payment.status = 'Paid';

      return new Response(JSON.stringify({ message: 'Payment successful', payment }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'We encountered a technical issue while processing your payment. Please try again later or contact our property management office for assistance' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else if (request.method === 'GET' && request.url.includes('/download')) {
    try {
      const fileContent = 'This is a mock payment receipt.';
      const headers = new Headers();
      headers.append('Content-Type', 'application/pdf');
      headers.append('Content-Disposition', 'attachment; filename="payment_receipt.pdf"');

      return new Response(fileContent, {
        status: 200,
        headers: headers,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to download the receipt.' }), {
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