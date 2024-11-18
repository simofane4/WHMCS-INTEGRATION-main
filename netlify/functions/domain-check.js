const axios = require('axios');

// Move these to environment variables in production
const WHMCS_API_URL = 'https://login.wget.ma/includes/api.php';
const API_IDENTIFIER = 'PLAfTuv5XfgMDdsy0a6ETC3sjs9qFwLU';
const API_SECRET = 'pw08vf3Il8lHsm2P7Hyx0kyTFdtXwo9X';
const ACCESS_KEY = 'CE39E3CFFC98BE973FDDD165C9AC9';

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { domain } = JSON.parse(event.body);

    if (!domain) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Domain name is required' })
      };
    }

    const params = new URLSearchParams({
      action: 'DomainWhois',
      username: API_IDENTIFIER,
      password: API_SECRET,
      accesskey: ACCESS_KEY,
      domain,
      responsetype: 'json'
    });

    const response = await axios.post(WHMCS_API_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('WHMCS API Response:', response.data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Domain search error:', error.response?.data || error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to check domain availability',
        details: error.response?.data || error.message
      })
    };
  }
};