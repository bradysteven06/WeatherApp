// Central place for all network calls + caching
// Keeps React components simple and testable

import axios from "axios";

const BASE =
  import.meta.env.VITE_OWM_BASE || "https://api.openweathermap.org/data/2.5";
const KEY = import.meta.env.VITE_OWM_API_KEY;

// --- Simple localStorage cache (per city + unit) for 10 minutes ---
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function makeCacheKey(city, unit) {
  // Normalize city key. Strip spaces and lower it for consistency.
  return `wx:${city.trim().toLowerCase()}:${unit}`;
}

function readCache(city, unit) {
  try {
    const raw = localStorage.getItem(makeCacheKey(city, unit));
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    if (Date.now() - at > CACHE_TTL_MS) {
      localStorage.removeItem(makeCacheKey(city, unit));
      return null;
    }
    return data;
  } catch {
    // If anything goes wrong parsing JSON, ignore cache and continue
    return null;
  }
}

function writeCache(city, unit, data) {
  try {
    const payload = JSON.stringify({ at: Date.now(), data });
    localStorage.setItem(makeCacheKey(city, unit), payload);
  } catch {
    // Storage can fail (quota, private mode). Non-fatal just skip caching.
  }
}

/**
 *
 * @param {string} city - e.g., "Eugene" or "Eugene,US"
 * @param {"imperial"|"metric"} unit - Fahrenheit("imperial") or Celsius("metric")
 * @returns {Promise<object>} Minimal normalized shape used by UI
 */

export async function getCurrentWeather(city, unit = "imperial") {
  if (!KEY) {
    throw new Error(
      "Missing OpenWeatherMap key. Add VITE_OWM_API_KEY to .env.local."
    );
  }

  // Try cache first (instant UI, fewer API calls)
  const cached = readCache(city, unit);
  if (cached) return cached;

  // Call openWeatherMap
  // Docs: https://openweathermap.org/current
  try {
    const params = {
      q: city,
      units: unit, // "imperial" for °F, "metric" for °C
      appid: KEY,
    };

    const { data } = await axios.get(`${BASE}/weather`, { params });

    // Normalize the response shape for UI (make UI resilient)
    const normalized = {
      id: data.id,
      name: data.name,
      coord: data.coord,
      main: {
        temp: data.main?.temp,
        feels_like: data.main?.feels_like,
        humidity: data.main?.humidity,
      },
      weather: data.weather, // array, e.g., [{ main: "Clouds", description: "overcast clouds", icon: "04d" }]
      wind: data.wind,
      sys: data.sys, // sunrise/sunset, country
      unit, // echo back which unit we used (handy for display decisions)
      raw: data, // keep raw if want to inspect later (debug)
    };

    // Write to cache for ~10 minutes
    writeCache(city, unit, normalized);
    return normalized;
  } catch (err) {
    // Axios error handling: human friendly messages
    if (err.response?.status === 404) {
      // City not found
      const msg = `No results for "${city}". Check spelling or try "City, CountryCode" (e.g., "Paris, FR").`;
      const e = new Error(msg);
      e.code = "CITY_NOT_FOUND";
      throw e;
    }

    if (err.code === "ERR_NETWORK") {
      const e = new Error(
        "Network error. Check your connection and try again."
      );
      e.code = "NETWORK";
      throw e;
    }

    // Generic fallback
    const e = new Error("Unexpected error fetching weather.");
    e.code = "UNKNOWN";
    throw e;
  }
}
