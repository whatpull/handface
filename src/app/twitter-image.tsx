// Twitter card image — opengraph-image 와 동일 디자인 재사용.
// 없으면 Next.js 가 openGraph image 를 fallback 으로 쓰지만, 명시 시 Twitter
// crawler 가 직접 `/twitter-image` 경로 영역 fetch — card spec 정합.

export { default, runtime, alt, size, contentType } from './opengraph-image';
