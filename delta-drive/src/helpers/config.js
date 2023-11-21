export const apiUrl = () => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');

  if (r.test(window.DELTA_DRIVE_URL)) {
    return window.DELTA_DRIVE_URL;
  } else {
    return window.location.origin + window.DELTA_DRIVE_URL;
  }
};
