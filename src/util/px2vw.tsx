export const px2vw = (size: number, width: number = 1920) =>
  `${(size / width) * 100}vw`;

