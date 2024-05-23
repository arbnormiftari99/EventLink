import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
 <>
<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
  <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
    <div className="flex flex-col justify-center gap-8">
      <h1 className="h1-bold">
        Linking Events. Connecting People.
      </h1>
      <p className="p-regular-20 md:p-regular-24">Experience, Explore, Enjoy: Your Event Odyssey Begins Here</p>
      {/* <p className="p-regular-15 md:p-regular-18">Dive into a world of excitement and discovery. Explore a curated selection of electrifying events, from pulsating concerts to captivating workshops. Book your tickets effortlessly and embark on unforgettable adventures. Join us and let the journey unfold.</p> */}
    <Button size="lg" asChild className="button w-full sm:w-fit">
      <Link href="#events">
       Explore Now
      </Link>

    </Button>
    </div>
  </div>
</section>

<section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
  <h2 className="h2-bold">Trusted by <br/> Thousands of Events</h2>
  <div className="flex w-full flex-col gap-5 md:flex-row">
    Search 
    CategoryFilter
  </div>
</section>
 </>
  );
}
