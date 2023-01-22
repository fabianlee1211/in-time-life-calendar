import SEO from '@/components/SEO';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <SEO
        title="About | In Time Life Calendar"
        description="Learn about In Time Life Calendar"
      />
      <article className="mx-auto prose prose-invert my-14 px-6">
        <Link href="/" className="btn btn-sm btn-ghost mb-4 -ml-2">
          Back
        </Link>
        <h1 className="text-digit">About This Project</h1>
        <p>
          The inspiration for this project comes from In Time and the Memento
          Mori Life Calendar, with the goal of providing a sobering perspective
          on the finite nature of our existence.
        </p>
        <p>
          Time is a relentless force that moves forward without mercy or
          compromise, and it is this reminder that our days are numbered that
          makes every moment of our lives precious. After all, if something were
          eternal, it would lose all value. We hope that this project will urge
          individuals to make the most of their time while they still have it.
        </p>

        <blockquote>
          Time is free, but it's priceless. You can't own it, but you can use
          it. You can't keep it, but you can spend it. Once you've lost it you
          can never get it back. <br />- Harvey Mackay
        </blockquote>
        <h2 className="text-digit">In Time</h2>
        <Image
          src="/images/in-time-clock.jpg"
          alt="In Time Clock"
          width={848}
          height={360}
        />
        <p>
          In Time is a 2011 science fiction film set in a future society where
          people stop aging at 25 and have to buy time to live. Time has become
          the most valuable currency and is used to pay for everything,
          including food, shelter and even more time. The lifespan timer on
          their forearm indicates the time they have left to live.
        </p>
        <h2 className="text-digit">Memento Mori Life Calendar</h2>
        <Image
          src="/images/life-calendar.png"
          alt="Life Calendar"
          width={748}
          height={748}
        />
        <a
          href="https://stoicreflections.com/products/memento-mori-life-calendar-framed"
          className="mx-auto block w-max opacity-50 -mt-4"
        >
          <em>From Stoic Reflection</em>
        </a>
        <p>
          <strong>"Memento Mori"</strong> is a Latin phrase that translates to{' '}
          <strong>"Remember you will die."</strong> While it may seem harsh,
          this message serves as a powerful reminder of the limited time we have
          in this life.
        </p>
        <p>
          The calendar, which represents each week with a square and each row
          with 52 squares that represents a year, allows individuals to mark the
          weeks they have lived. The calendar assumes a lifespan of 80 years,
          although{' '}
          <a href="https://www.statista.com/statistics/270861/life-expectancy-by-continent/">
            the worldwide average human life expectancy is 73 years
          </a>
          , it varies across different continents. Despite advancements in
          technology and medicine, there will always be a limit to our time on
          earth.
        </p>
        <h2 className="text-digit">How to use it?</h2>
        <p>
          The timer is formatted as it was in the movie. And the calendar works
          exactly the same as the handwritten one. The only difference is that
          you can also provide your expected lifespan.
        </p>
        <Image
          src="/images/timer-explanation.png"
          alt="Timer Explanation"
          width={989}
          height={175}
        />
        <p>
          The In Time Life Calendar is a reminder tool that automatically fills
          in your remaining lifespan once you provide your birth date and
          expected lifespan. The calendar updates in real-time, so you never
          have to refresh the page to see the changes.
        </p>
        <p>
          This tool serves as a powerful reminder to make the most of the time
          we have and to live our lives to the fullest. Whenever you find
          yourself feeling stuck or wasting time, take a glance at the calendar
          and ask yourself, "Is this moment worth letting slip away?" Use the In
          Time Life Calendar as a tool to stay motivated and make the most of
          every precious moment."
        </p>
        <blockquote>
          Determine never to be idle. No person will have occasion to complain
          of the want of time who never loses any. It is wonderful how much can
          be done if we are always doing. <br />- Thomas Jefferson
        </blockquote>
      </article>
    </>
  );
}
