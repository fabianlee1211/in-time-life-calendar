import { useMemo, useState } from 'react';
import {
  parseISO,
  differenceInSeconds,
  differenceInYears,
  add
} from 'date-fns';
import { circIn, motion, Variants } from 'framer-motion';
import cn from 'classnames';
import { useInterval } from '@/hooks';
import Tile from './Tile';

const weeksInOneYear = 52;
const weeksInHalfYear = weeksInOneYear / 2;
const totalWeeks = Array.from({ length: weeksInOneYear }, (_, i) => i + 1);

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.5,
      delayChildren: 1.8,
      staggerChildren: 0.03,
      ease: circIn
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1
  }
};

export default function Calendar({
  birthDate,
  expectedLifespan
}: {
  birthDate: string;
  expectedLifespan: number;
}) {
  const [settings, setSettings] = useState(() => calculateSettings(birthDate));
  const totalYears = useMemo(
    () => Array.from({ length: expectedLifespan }, (_, i) => i + 1),
    [expectedLifespan]
  );

  useInterval(() => setSettings(calculateSettings(birthDate)), 1000 * 60);

  const { maxFillYear, remainingWeeksFraction, remainingWeeksInInteger } =
    settings;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-8"
    >
      {totalYears.map((year) => {
        return (
          <motion.div
            key={year}
            variants={item}
            className={cn(
              'tooltip tooltip-primary grid grid-cols-1 xl:grid-cols-2 gap-1 sm:gap-2 xl:gap-12 mx-auto relative w-max hover:bg-digit/5',
              {
                'mb-8 sm:mb-10': year % 10 === 0,
                'mb-1 sm:mb-2': year % 10 !== 0
              }
            )}
            data-tip={`Year ${year}`}
          >
            <div className="grid gap-1 md:gap-2 grid-flow-col grid-rows-1">
              {/* Handles the first half of the year */}
              {totalWeeks.slice(0, weeksInHalfYear).map((week) => {
                const weekCount = getWeekCount(week, year);
                // Fills all past years
                if (year <= maxFillYear) {
                  return <Tile key={week} week={weekCount} progress={1} />;
                } else if (year > maxFillYear + 1) {
                  // Leave all future years empty
                  return <Tile key={week} week={weekCount} progress={0} />;
                } else if (week === remainingWeeksInInteger + 1) {
                  // Fills the current week
                  return (
                    <Tile
                      key={week}
                      week={weekCount}
                      isActive
                      progress={remainingWeeksFraction}
                    />
                  );
                } else if (remainingWeeksInInteger >= week) {
                  // Fills all past weeks in a year
                  return <Tile key={week} week={weekCount} progress={1} />;
                }
                // Leave all future weeks in a year empty
                return <Tile key={week} week={weekCount} progress={0} />;
              })}
            </div>
            <div className="grid gap-1 md:gap-2 grid-flow-col grid-rows-1">
              {/* Handles the second half of the year */}
              {totalWeeks.slice(weeksInHalfYear, weeksInOneYear).map((week) => {
                const weekCount = getWeekCount(week, year);

                if (year <= maxFillYear) {
                  return <Tile key={week} week={weekCount} progress={1} />;
                } else if (year > maxFillYear + 1) {
                  return <Tile key={week} week={weekCount} progress={0} />;
                } else if (
                  remainingWeeksInInteger >= weeksInHalfYear &&
                  week === remainingWeeksInInteger + 1
                ) {
                  return (
                    <Tile
                      key={week}
                      week={weekCount}
                      isActive
                      progress={remainingWeeksFraction}
                    />
                  );
                } else if (
                  remainingWeeksInInteger > weeksInHalfYear &&
                  remainingWeeksInInteger >= week
                ) {
                  return <Tile key={week} week={weekCount} progress={1} />;
                }

                return <Tile key={week} week={weekCount} progress={0} />;
              })}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function getWeekCount(week = 1, year = 1) {
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
