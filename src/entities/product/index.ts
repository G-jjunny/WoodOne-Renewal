/**
 * Product 엔티티 Public API
 *
 * 외부 레이어(widgets, features, app)는 이 index.ts를 통해서만
 * Product 엔티티에 접근할 수 있습니다.
 * 내부 파일에 직접 접근하는 것은 FSD 규칙 위반입니다.
 */
export type {
  Product,
  ProductSummary,
  ProductImage,
  ProductCategory,
  ProductFinish,
} from "./model/product.types";
