import { memo } from 'react';

function Tile({
  progress,
  week,
  isActive = false
}: {
  progress: number;
  week: number;
  isActive?: boolean;
}) {
  return (
    <div className="relative">
      <svg
        className="max-w-full max-h-full w-[10px] h-[10px] sm:w-4 sm:h-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="h-[10px] sm:h-4 stroke-digit/60 fill-digit/70 stroke-2 transition-all"
          width={`${progress * 100}%`}
          height="100%"
          data-week={week}
        />
        <rect
          className={`w-[10px] h-[10px] sm:h-4 sm:w-4 stroke-2 fill-transparent ${
            progress === 0 ? 'stroke-digit/10' : 'stroke-digit/60'
          }`}
          width="100%"
          height="100%"
          data-week={week}
        />
      </svg>
      {isActive && (
        <span className="absolute bg-digit animate-ping inline-flex h-full w-full inset-0" />
      )}
    </div>
  );
}

export default memo(Tile);
