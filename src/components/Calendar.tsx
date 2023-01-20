import { useState } from 'react';
import {
  parseISO,
  differenceInSeconds,
  differenceInYears,
  add
} from 'date-fns';
import { useInterval } from '@/hooks';
import Tile from './Tile';

const weeksInOneYear = 52;
const weeksInHalfYear = weeksInOneYear / 2;
const totalWeeks = Array.from({ length: weeksInOneYear }, (_, i) => i + 1);

function getWeek(week = 1, year = 1) {
  return week + weeksInOneYear * (year - 1);
}

function calculateSettings(birthDate: string) {
  const bornAt = parseISO(birthDate);
  const now = new Date();
  const maxFillYear = differenceInYears(now, bornAt);
  const remaining = add(bornAt, { years: maxFillYear });
  const remainingMaxFillSecond = differenceInSeconds(now, remaining);
  const remainingMaxFillWeek = remainingMaxFillSecond / (7 * 24 * 60 * 60);

  return {
    maxFillYear,
    remainingWeeksInInteger: Math.floor(remainingMaxFillWeek),
    remainingWeeksFraction:
      remainingMaxFillWeek - Math.floor(remainingMaxFillWeek)
  };
}

export default function Calendar({
  birthDate,
  expectedLifespan
}: {
  birthDate: string;
  expectedLifespan: number;
}) {
  const totalYears = Array.from({ length: expectedLifespan }, (_, i) => i + 1);
  const [settings] = useState(() => calculateSettings(birthDate));

  useInterval(() => calculateSettings(birthDate), 1000 * 60);

  const { maxFillYear, remainingWeeksFraction, remainingWeeksInInteger } =
    settings;

  console.table(settings);

  return (
    <>
      {totalYears.map((year) => {
        return (
          <div
            key={year}
            id={`year-${year}`}
            className={`tooltip grid grid-cols-1 xl:grid-cols-2 gap-1 sm:gap-2 xl:gap-12 mx-auto relative w-max hover:bg-zinc-800 ${
              year % 10 === 0 ? 'mb-10' : 'mb-2'
            }`}
            data-tip={`Year ${year}`}
          >
            <div className="grid gap-1 md:gap-2 grid-flow-col grid-rows-1">
              {totalWeeks.slice(0, weeksInHalfYear).map((week) => {
                const currentWeek = getWeek(week, year);
                // Fills all past years
                if (year <= maxFillYear) {
                  return <Tile key={week} week={currentWeek} progress={1} />;
                } else if (year > maxFillYear + 1) {
                  // Leave all future years empty
                  return <Tile key={week} week={currentWeek} progress={0} />;
                } else if (week === remainingWeeksInInteger + 1) {
                  // Fills the current week
                  return (
                    <Tile
                      key={week}
                      week={currentWeek}
                      progress={remainingWeeksFraction}
                    />
                  );
                } else if (remainingWeeksInInteger >= week) {
                  // Fills all past weeks in a year
                  return <Tile key={week} week={currentWeek} progress={1} />;
                }
                // Leave all future weeks in a year empty
                return <Tile key={week} week={currentWeek} progress={0} />;
              })}
            </div>
            <div className="grid gap-1 md:gap-2 grid-flow-col grid-rows-1">
              {totalWeeks.slice(weeksInHalfYear, weeksInOneYear).map((week) => {
                const currentWeek = getWeek(week, year);

                if (year <= maxFillYear) {
                  return <Tile key={week} week={currentWeek} progress={1} />;
                } else if (year > maxFillYear + 1) {
                  return <Tile key={week} week={currentWeek} progress={0} />;
                } else if (
                  remainingWeeksInInteger >= weeksInHalfYear &&
                  week === remainingWeeksInInteger + 1
                ) {
                  return (
                    <Tile
                      key={week}
                      week={currentWeek}
                      progress={remainingWeeksFraction}
                    />
                  );
                } else if (
                  remainingWeeksInInteger > weeksInHalfYear &&
                  remainingWeeksInInteger >= week
                ) {
                  return <Tile key={week} week={currentWeek} progress={1} />;
                }

                return <Tile key={week} week={currentWeek} progress={0} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
