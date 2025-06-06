const shapingTaelogURL = (url: string): string => {
  const parts = url.split(/(rstLst\/)/);
  const resultUrl = parts[0] + parts[1];
  return resultUrl;
};

export default shapingTaelogURL;
