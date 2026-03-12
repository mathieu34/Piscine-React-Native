export function getTotalPhotos(photos = []) {
  return photos.length;
}

export function getMostActiveDay(photos = []) {
  if (!photos.length) return null;

  const counts = {};

  photos.forEach((photo) => {
    const day = photo.date?.slice(0, 10);
    if (!day) return;
    counts[day] = (counts[day] || 0) + 1;
  });

  let maxDay = null;
  let maxCount = 0;

  for (const day in counts) {
    if (counts[day] > maxCount) {
      maxDay = day;
      maxCount = counts[day];
    }
  }

  return {
    day: maxDay,
    count: maxCount,
  };
}

export function getStats(photos = []) {
  return {
    totalPhotos: getTotalPhotos(photos),
    mostActiveDay: getMostActiveDay(photos),
  };
}