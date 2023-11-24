export const calculateDistance = (point1: any, point2: any) => {
  const earthRadiusKm = 6371;
  const lat1Rad = degreesToRadians(point1.lat);
  const lon1Rad = degreesToRadians(point1.lng);
  const lat2Rad = degreesToRadians(point2.lat);
  const lon2Rad = degreesToRadians(point2.lng);
  const latDiff = lat2Rad - lat1Rad;
  const lonDiff = lon2Rad - lon1Rad;
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;
  return distance;
};

const degreesToRadians = (degrees: any) => {
  return (degrees * Math.PI) / 180;
};
