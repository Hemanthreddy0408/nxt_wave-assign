// Reads VITE_API_URL from environment (Vercel) or falls back to relative '/api' for local proxy
const RAW_URL = import.meta.env.VITE_API_URL || '';
const BASE_URL = RAW_URL ? RAW_URL.replace(/\/+$/, '') : '';
const API_BASE = `${BASE_URL}/api`;

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'nxtwave-admin-2025';

export const registerStudent = async (data) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration request failed');
  }
  return response.json();
};

export const getStudentByReferral = async (code) => {
  const response = await fetch(`${API_BASE}/referral/${encodeURIComponent(code)}`);
  return response.json();
};

export const getCollegeLeaderboard = async () => {
  const response = await fetch(`${API_BASE}/leaderboard/colleges`);
  return response.json();
};

export const getGrowthMetrics = async () => {
  const response = await fetch(`${API_BASE}/growth/metrics`);
  return response.json();
};

export const getAllRegistrations = async (search = '', limit = 50) => {
  const response = await fetch(
    `${API_BASE}/admin/registrations?search=${encodeURIComponent(search)}&limit=${limit}`,
    {
      headers: {
        'x-admin-key': ADMIN_KEY,
      },
    }
  );
  return response.json();
};

export const trackFunnelEvent = async (eventType, metadata = {}) => {
  try {
    await fetch(`${API_BASE}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, metadata }),
    });
  } catch (e) {
    console.debug('Analytics ping failed', e);
  }
};
