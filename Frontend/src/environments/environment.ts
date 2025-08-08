export const environment = {
  production: true,
  apiUrl: process.env['BACKEND_URL'] || '/api'  // Use environment variable or fallback to relative path
};
