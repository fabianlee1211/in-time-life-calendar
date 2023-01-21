import React, { useState } from 'react';
import cn from 'classnames';
import { add, parseISO, format, differenceInMilliseconds } from 'date-fns';
import { AnimatePresence, easeIn, motion } from 'framer-motion';
import { leftFillNum } from '@/utils';
import { useMedia } from 'react-use';
import { useInterval } from '@/hooks';

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = week * 52;
const startingTimeLeft = {
  years: '0000',
  weeks: '00',
  days: '0',
  hours: '00',
  minutes: '00',
  seconds: '00'
};

export default function Timer({
  birthDate,
  expectedLifespan,
  onReset
}: {
  birthDate: string;
  expectedLifespan: number;
  onReset: () => void;
}) {
  const isSm = useMedia('(min-width: 640px)');
  const isMd = useMedia('(min-width: 768px)');
  const [timeLeft, setTimeLeft] = useState(startingTimeLeft);
  const [isEnded, setIsEnded] = useState(false);

  function pronounceDead() {
    setTimeLeft(startingTimeLeft);
    setIsEnded(true);
  }

  function calculateTimeLeft(expectedDeath: Date) {
    const difference = differenceInMilliseconds(expectedDeath, new Date());

    if (difference > 0) {
      setTimeLeft({
        years: leftFillNum(Math.floor(difference / year), 4),
        weeks: leftFillNum(Math.floor((difference % year) / week)),
        days: leftFillNum(Math.floor((difference % week) / day), 1),
        hours: leftFillNum(Math.floor((difference % day) / hour)),
        minutes: leftFillNum(Math.floor((difference % hour) / minute)),
        seconds: leftFillNum(Math.floor((difference % minute) / second))
      });
    }

    if (difference <= 0) {
      pronounceDead();
    }
  }

  const expectedDeath = add(parseISO(birthDate), { years: expectedLifespan });
  const formattedStart = format(parseISO(birthDate), 'd MMM yyyy');
  const formattedEnd = format(expectedDeath, 'd MMM yyyy');

  useInterval(() => calculateTimeLeft(expectedDeath), 1000, isEnded);

  const digitWidth = isMd ? 38 : isSm ? 26 : 16;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: easeIn
      }}
      className="flex flex-col items-center justify-center py-8"
    >
      <p className="text-center mb-2 text-zinc-700 text-sm font-semibold">{`${expectedLifespan} Years of Living`}</p>
      <p className="text-center mb-2 text-digit">
        {`${formattedStart} - ${formattedEnd}`}
      </p>
      <div className="flex justify-center items-center select-none">
        {Object.entries(timeLeft).map(([type, time], sectionIndex, entries) => {
          return (
            <React.Fragment key={type}>
              <motion.div className="flex items-center text-center justify-around">
                <motion.div
                  data-tip={toTitleCase(type)}
                  className={cn(
                    'flex relative h-[36px] sm:h-[48px] md:h-[72px] tooltip tooltip-bottom tooltip-primary',
                    {
                      'w-[64px] sm:w-[104px] md:w-[156px]': type === 'years',
                      'w-[16px] sm:w-[26px] md:w-[39px]': type === 'days',
                      'w-[32px] sm:w-[52px] md:w-[78px]':
                        type !== 'years' && type !== 'days'
                    }
                  )}
                >
                  <AnimatePresence>
                    {time.split('').map((digit, i) => {
                      return (
                        <motion.p
                          key={`${type}-${digit}-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: easeIn
                          }}
                          className={cn(
                            `text-3xl sm:text-5xl font-thin tabular-nums md:text-7xl tracking-tighter absolute top-0`,
                            {
                              'text-digit neon-shadow': !isEnded,
                              'text-zinc-800 gray-shadow': isEnded
                            }
                          )}
                          style={{ left: `${i * digitWidth}px` }}
                        >
                          {digit}
                        </motion.p>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
              {sectionIndex !== entries.length - 1 && (
                <span
                  className={cn('mx-2 w-1 h-1 sm:h-2 sm:w-2 rounded-full', {
                    'bg-digit shadow-neon': !isEnded,
                    'bg-zinc-800': isEnded
                  })}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <button
        onClick={onReset}
        className="btn btn-outline btn-xs mt-3 opacity-10 hover:opacity-50"
      >
        Change
      </button>
    </motion.div>
  );
}

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
