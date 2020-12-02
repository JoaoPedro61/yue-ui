export interface YueUiFilterBarEvent<M = any> {
  type: `modelChanged` | `search`;
  data: Partial<M>;
}
