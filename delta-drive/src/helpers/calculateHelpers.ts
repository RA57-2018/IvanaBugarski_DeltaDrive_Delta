export const calculatesDistance = (path: Array<[number, number]>): number => {
  const R = 6371000;//Earth radius in meters
  let totalDistance = 0;

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  for (let i = 0; i < path.length - 1; i++) {
    const lat1 = path[i][0];
    const lon1 = path[i][1];
    const lat2 = path[i + 1][0];
    const lon2 = path[i + 1][1];
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;//Distance in meters
    totalDistance += distance;
  }
  return totalDistance;
};

export const calculateDistance = (point1: any, point2: any) => {
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = point2.lat;
  const lon2 = point2.lng;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};
