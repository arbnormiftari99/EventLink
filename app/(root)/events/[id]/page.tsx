import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types'
import Image from 'next/image';

const EventDetails = async ({ params: { id }, searchParams}: SearchParamProps) => {
    const event = await getEventById(id);

    const relatedEvents = await getRelatedEventsByCategory({
      categoryId: event.category._id,
      eventId: event._id,
      page: searchParams.page as string
    })


  return (
    <>
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
    <div className='2xl:max-w-7xl w-full grid grid-cols-1 md:grid-cols-2'>
      <div className='flex justify-center items-center p-5'>
        <Image
          src={event.imageUrl}
          alt="hero image"
          width={600}
          height={600}
          className='w-full h-full min-h-[400px] object-center object-cover rounded-lg shadow-lg'
        />
      </div>
      <div className='flex flex-col w-full gap-8 p-5 md:p-10 mt-10'>
        <div className='flex flex-col gap-6'>
          <h2 className='h2-bold'>{event.title}</h2>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='flex gap-3'>
              <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
                {event.isFree ? 'FREE' : `EUR ${event.price}`}
              </p>
              <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-gray-500'>
                {event.category.name}
              </p>
            </div>
            <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
              <span className='rounded-full bg-grey-500/10 px-2 py-1.5 text-gray-500'>creator</span>{' '}
              <span className='text-primary-500'>{event.organizer.firstName} {event.organizer.lastName}</span>
            </p>
          </div>
        </div>

      <CheckoutButton event={event}/>

        <div className='flex flex-col gap-5'>
          <div className='flex gap-2 md:gap-3'>
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={28}
              height={28}
            />
            <div className='p-m-10 lg:p-regular-15 flex flex-wrap items-center'>
              <p>{formatDateTime(event.startDateTime).dateOnly} - {' '}
                {formatDateTime(event.startDateTime).timeOnly} {' / '}
              </p>
              <p className='ml-1'>{formatDateTime(event.endDateTime).dateOnly} - {' '}
                {formatDateTime(event.endDateTime).timeOnly}
              </p>
            </div>
          </div>
          <div className='p-regular-20 flex items-center gap-3'>
            <Image
              src="/assets/icons/location.svg"
              alt="location"
              width={28}
              height={28}
            />
            <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='p-bold-20 text-grey-600'>About this event:</p>
          <p className='p-medium-17 lg:p-regular-18'>
            {event.description ? event.description : 'Description not available for this event.'}
          </p>
        </div>
      </div>
    </div>
  </section>
  
  <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
    <h2 className='h2-bold'>Related Events</h2>

    <Collection 
    data={relatedEvents?.data}
    emptyTitle="No events found"
    emptyStateSubText="Come back later..."
    collectionType="All_Events"
    limit={6}
    page={1}
    totalPages={2}
    />

  </section>


  </>
  )
}

export default EventDetails