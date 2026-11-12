/* Drawn ingredients and icons. Swap any of these for real photos later if you like. */

export type IngredientName =
  | "tigernut" | "date" | "coconut" | "ginger" | "strawberry" | "blueberry"
  | "honey" | "mint" | "mango" | "protein" | "leaf" | "drop" | "gut" | "bolt";

const ridges = [28, 40, 52, 64, 76];
const seeds = [[38, 46], [56, 44], [46, 60], [64, 60], [36, 64], [52, 76]];

function Shapes({ name }: { name: IngredientName }) {
  switch (name) {
    case "tigernut":
      return (<>
        <ellipse cx="50" cy="52" rx="40" ry="32" fill="#9C6436" stroke="#6A3E1E" strokeWidth="3" />
        {ridges.map((x) => (
          <path key={x} d={`M${x - 6} ${30 + Math.abs(52 - x) / 3} q6 22 0 44`} fill="none" stroke="#6A3E1E" strokeWidth="3" strokeLinecap="round" />
        ))}
        <ellipse cx="38" cy="38" rx="10" ry="5" fill="#fff" opacity=".22" />
      </>);
    case "date":
      return (<>
        <ellipse cx="50" cy="50" rx="24" ry="42" fill="#6B2A16" transform="rotate(20 50 50)" />
        <ellipse cx="44" cy="34" rx="6" ry="16" fill="#fff" opacity=".2" transform="rotate(20 50 50)" />
        <path d="M60 12 l6 -8" stroke="#3a2416" strokeWidth="5" strokeLinecap="round" />
      </>);
    case "coconut":
      return (<>
        <circle cx="50" cy="54" r="42" fill="#6B4226" />
        <circle cx="50" cy="54" r="34" fill="#FFFDF5" stroke="#EDE3D0" strokeWidth="4" />
        <ellipse cx="40" cy="44" rx="12" ry="7" fill="#fff" />
      </>);
    case "ginger":
      return (<>
        <path d="M18 62 q10-26 30-18 q8-22 26-10 q14 12 2 26 q14 14-6 22 q-20 6-28-6 q-18 6-24-14z" fill="#E1B26A" />
        <path d="M30 60 q14-4 22 6 M58 44 q2 14 10 18" stroke="#B8843E" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>);
    case "strawberry":
      return (<>
        <path d="M50 92 C 18 70, 14 40, 26 30 Q 50 20 74 30 C 86 40, 82 70, 50 92z" fill="#E8344E" />
        <path d="M28 28 q10-14 22-6 q12-8 22 6 q-12 6-22 2 q-10 4-22-2z" fill="#3E9E4C" />
        {seeds.map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx="2.2" ry="3.2" fill="#FFE08A" />)}
      </>);
    case "blueberry":
      return (<>
        <circle cx="50" cy="52" r="40" fill="#3E4CA0" />
        <path d="M42 20 l8 8 l8 -8 M50 28 v-10" stroke="#1F2766" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="36" cy="40" rx="9" ry="6" fill="#fff" opacity=".3" />
      </>);
    case "honey":
      return (<>
        <rect x="46" y="4" width="8" height="46" rx="4" fill="#9C6436" />
        {[0, 1, 2, 3].map((i) => <ellipse key={i} cx="50" cy={52 + i * 10} rx={22 - i * 2} ry="5" fill="#E8A21E" />)}
        <path d="M50 92 q-6 0 0 8 q6-8 0-8z" fill="#F2B632" />
      </>);
    case "mint":
      return (<>
        <path d="M50 90 C 20 70, 14 30, 40 10 C 60 30, 70 60, 50 90z" fill="#4BAE6A" />
        <path d="M50 90 C 44 60, 42 36, 40 12" stroke="#2C7A45" strokeWidth="3" fill="none" />
        <path d="M56 82 C 84 70, 92 38, 76 22 C 62 40, 56 60, 56 82z" fill="#62C27F" />
      </>);
    case "mango":
      return (<>
        <path d="M20 60 C 18 30, 48 10, 72 24 C 92 36, 86 76, 56 86 C 36 92, 22 80, 20 60z" fill="#F6A81E" />
        <path d="M30 56 C 34 38, 50 28, 66 32" stroke="#FFD36B" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M70 22 q8-14 18-12" stroke="#3E9E4C" strokeWidth="5" fill="none" strokeLinecap="round" />
      </>);
    case "protein":
      return (<>
        <path d="M22 50 h56" stroke="#1E1A17" strokeWidth="8" strokeLinecap="round" />
        <rect x="14" y="32" width="14" height="36" rx="5" fill="#1E1A17" />
        <rect x="72" y="32" width="14" height="36" rx="5" fill="#1E1A17" />
      </>);
    case "leaf":
      return (<>
        <path d="M18 82 C 18 40, 50 16, 86 16 C 86 54, 60 84, 18 82z" fill="#3E9E4C" />
        <path d="M18 82 C 40 60, 56 44, 76 28" stroke="#E8F6EA" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>);
    case "drop":
      return (<>
        <path d="M50 10 C 34 36, 20 52, 20 66 a30 30 0 0 0 60 0 C 80 52, 66 36, 50 10z" fill="#F6F1E6" stroke="#C9B9A2" strokeWidth="3" />
        <ellipse cx="40" cy="62" rx="6" ry="10" fill="#fff" />
      </>);
    case "gut":
      return (<>
        <path d="M30 24 h36 a14 14 0 0 1 0 28 h-32 a12 12 0 0 0 0 24 h40" stroke="#D8436C" strokeWidth="10" fill="none" strokeLinecap="round" />
        {[[30, 24], [66, 52], [34, 76]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#fff" />)}
      </>);
    case "bolt":
      return <path d="M56 6 L22 56 h24 l-8 38 l36-52 h-24z" fill="#E8A21E" />;
  }
}

export function Ingredient({ name, className, style }: { name: IngredientName; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <Shapes name={name} />
    </svg>
  );
}