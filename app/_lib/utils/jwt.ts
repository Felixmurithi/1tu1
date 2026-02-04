/**
 * Decodes a JWT token without verification (for parsing user info)
 * Note: This does NOT verify the token signature - use only for parsing user data
 */
export function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid JWT format');
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error(`Failed to decode JWT: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Verifies and decodes a Google ID token
 * You should implement proper verification in production
 */
export async function verifyGoogleIdToken(idToken: string) {
  try {
    // For production, you should verify the token with Google's public keys
    // https://www.googleapis.com/oauth2/v3/certs
    
    // For now, just decode without verification
    const payload = decodeJWT(idToken);
    
    // Basic validation
    if (!payload.iss || !payload.aud || !payload.exp) {
      throw new Error('Invalid token structure');
    }
    
    // Check if token is expired
    if (payload.exp * 1000 < Date.now()) {
      throw new Error('Token expired');
    }
    
    return payload;
  } catch (error) {
    throw new Error(`Failed to verify Google ID token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
