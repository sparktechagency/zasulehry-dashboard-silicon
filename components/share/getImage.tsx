export const getImageSrc = (image?: string) => {
  // empty, null, undefined
  if (!image || image.trim() === "") {
    return "/default.png";
  }

  // already full URL
  if (image.startsWith("http")) {
    return image;
  }

  // missing env variable
  if (!process.env.NEXT_PUBLIC_IMAGE_URL) {
    return "/default.png";
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`;
};
