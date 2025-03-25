
// GraphHopper API Key
const API_KEY = "c5d6e2f7-b0bf-43d3-9de8-ef3a4f6ac247";

export const getDistance = async (source: string, destination: string): Promise<number | null> => {
  try {
    // Get source coordinates
    const sourceUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(source)}&key=${API_KEY}`;
    const sourceResponse = await fetch(sourceUrl);
    const sourceData = await sourceResponse.json();
    
    if (!sourceData.hits || sourceData.hits.length === 0) {
      return null;
    }
    
    const sourceLat = sourceData.hits[0].point.lat;
    const sourceLon = sourceData.hits[0].point.lng;

    // Get destination coordinates
    const destUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(destination)}&key=${API_KEY}`;
    const destResponse = await fetch(destUrl);
    const destData = await destResponse.json();
    
    if (!destData.hits || destData.hits.length === 0) {
      return null;
    }
    
    const destLat = destData.hits[0].point.lat;
    const destLon = destData.hits[0].point.lng;

    // Get route distance
    const routeUrl = `https://graphhopper.com/api/1/route?point=${sourceLat},${sourceLon}&point=${destLat},${destLon}&vehicle=car&key=${API_KEY}&calc_points=false`;
    const routeResponse = await fetch(routeUrl);
    const routeData = await routeResponse.json();

    if (routeData.paths && routeData.paths.length > 0) {
      return parseFloat((routeData.paths[0].distance / 1000).toFixed(2)); // Convert meters to km and round to 2 decimals
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching distance:", error);
    return null;
  }
};

// Emission factors in kg CO₂ per km per kg of weight
export interface EmissionFactors {
  [key: string]: number;
}

const EMISSION_FACTORS: EmissionFactors = {
  truck: 0.1,
  ship: 0.02,
  airplane: 0.8,
  train: 0.04
};

export const calculateEmissions = (weight: number, distance: number, mode: string): number => {
  const factor = EMISSION_FACTORS[mode as keyof typeof EMISSION_FACTORS] || EMISSION_FACTORS.truck;
  return parseFloat((weight * distance * factor).toFixed(2));
};
