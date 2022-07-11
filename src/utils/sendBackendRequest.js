import { notification } from 'antd'

const DENT_IN_FUNCTIONS_API_URL =
  process.env.REACT_APP_DENT_IN_FUNCTIONS_API_URL

const sendBackendRequest = async (
  endpoint,
  method = 'POST',
  body,
  headers,
  errorDescription,
  isJsonResponse = true
) => {
  try {
    if (!body || !endpoint) {
      throw new Error('Missing required parameters as endpoint or body')
    }

    const jsonBody = JSON.stringify(body)

    // Make api call with passed params
    const response = await fetch(DENT_IN_FUNCTIONS_API_URL + endpoint, {
      method,
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: jsonBody
    })

    // Return parsed json response if needed
    if (isJsonResponse) {
      const jsonResponse = await response.json()
      return jsonResponse
    }
    return response
  } catch (error) {
    notification.error({
      message: 'Error',
      description: `${errorDescription}. ${error.message}`,
      placement: 'topRight'
    })
  }
}

export default sendBackendRequest
