export const fetchThumbnail = (url: string) => {
  try {
    const urlList = url.split("/");
    const videoId = urlList[urlList.length - 1];
    if (!videoId) return;
    return `https://img.youtube.com/vi/${videoId}/1.jpg`;
  } catch (error) {
    console.error("Error fetching thumbnail:", error);
  }
};
