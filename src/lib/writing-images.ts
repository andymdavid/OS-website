import deliveryAssets from '../generated/delivery-assets.json';
const widths = [400, 640, 960, 1456];
export function writingImage(src: string, width = 640) {
  const key = `/optimized/${src.split('/').pop()?.replace('.webp', '')}-${width}.webp`;
  return (deliveryAssets.assets as Record<string, string>)[key] || src;
}
export function writingImageSrcSet(src: string) {
  const variants = widths.map(width => [width, writingImage(src, width)] as const);
  return variants.every(([, url]) => url !== src) ? variants.map(([width,url]) => `${url} ${width}w`).join(', ') : undefined;
}
