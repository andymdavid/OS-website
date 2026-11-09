import manifest from '../generated/delivery-assets.json';
type ImageName = keyof typeof manifest.images;
export function deliveryImage(name: string, width: number, format: 'webp' | 'avif' = 'webp') {
  const variants = manifest.images[name as ImageName] as Record<string, { webp: string; avif: string }>;
  if (!variants?.[width]) throw new Error(`Missing delivery image ${name} ${width}`);
  return variants[width][format];
}
export function deliverySrcset(name: string, widths: number[], format: 'webp' | 'avif' = 'webp') {
  return widths.map(width => `${deliveryImage(name, width, format)} ${width}w`).join(', ');
}
export function deliveryFont(source: string) { return (manifest.fonts as Record<string, string>)[source] || source; }

export function deliveryStatic(source: string) { return (manifest.assets as Record<string, string>)[source] || source; }

export function responsiveStatic(source: string, width: number) {
  const key = `/optimized/${source.split('/').pop()?.replace(/\.[^.]+$/, '')}-${width}.webp`;
  return (manifest.assets as Record<string, string>)[key] || source;
}
export function responsiveStaticSrcset(source: string, widths: number[]) {
  const variants = widths.map(width => [width, responsiveStatic(source, width)] as const);
  return variants.every(([, url]) => url !== source) ? variants.map(([width,url]) => `${url} ${width}w`).join(', ') : undefined;
}
