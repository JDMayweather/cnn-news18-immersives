/**
 * Ambient depth for the page: a scroll-linked dawn→dusk light wash and a slow
 * drifting dust field behind the reading column. Both are presentation only —
 * fixed, pointer-transparent, and painted below the content (z-index 1, while
 * the reading wrap is z-index 2). The wash is driven by a CSS scroll timeline,
 * so no JavaScript runs it; where timelines or motion are unavailable it holds
 * a neutral state.
 */
export default function Atmosphere(): React.JSX.Element {
  return (
    <div className="nv-atmo" aria-hidden="true">
      <div className="nv-atmo-layer nv-atmo-dawn" />
      <div className="nv-atmo-layer nv-atmo-dusk" />
      <div className="nv-dust" />
    </div>
  );
}
