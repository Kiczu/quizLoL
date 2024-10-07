import { randomNumberTo } from "../../utils/number";

const images = require.context("../../assets/images/login", true);
const imageList = images.keys().map((image) => images(image));

export const getRandomImage = () => {
  const randomIndex = randomNumberTo(imageList.length);
  return imageList[randomIndex];
};
