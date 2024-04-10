import { PlusIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Button, EventList, NewEventModal } from 'components';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useFetchMainEvents } from 'redux/MainEvent/hooks';
import {
  getMainEvents,
  getMainEventsByStatus,
} from 'redux/MainEvent/selectors';
import { getQuotePipeValueV2 } from 'utils/quote';
import { PageLayout } from '../../layouts';
import { EventStatus } from '../../redux/Events/slices';
import {
  classNames,
  getSubEventsFromPeriod,
  getSubEventsListFromMainEvents,
  getThisMonthDates,
  getThisWeekDates,
  getThisYearDates,
} from '../../utils/utils';
import { MainEvent } from 'interface/Event/main-event.interface';
import {
  sortEvents,
  sortPendingEvents,
  sortDoneEvents,
  sortLostEvents,
  sortNewEvents,
  sortOverdueEvents,
  sortPastEvents,
  sortReadyEvents,
} from 'utils/eventsSorting';

enum FILTER_OPTIONS {
  THIS_WEEK = 'THIS_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  THIS_YEAR = 'THIS_YEAR',
  CUSTOM = 'CUSTOM',
}

export const Events = () => {
  const intl = useIntl();

  const [shouldOpenNewEvent, setOpenNewEventModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParam =
    FILTER_OPTIONS[searchParams.get('filter') as FILTER_OPTIONS];
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');

  const [startDate, setStartDate] = useState<string>(
    startDateParam || getThisYearDates()[0].toString(),
  );
  const [endDate, setEndDate] = useState<string>(
    endDateParam || getThisYearDates()[1].toString(),
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(
    filterParam || FILTER_OPTIONS.THIS_YEAR,
  );

  const [{ isLoading: isLoadingEvents }, fetchMainEvents] =
    useFetchMainEvents();

  // const mainEvents = useSelector(getMainEvents);

  const newEventsList = useSelector((state: any) =>
    getMainEventsByStatus(state, EventStatus.INBOX),
  );

  const eventsDoneList = useSelector((state: any) =>
    getMainEventsByStatus(
      state,
      EventStatus.INVOICE_OVERDUE,
      EventStatus.DONE,
      EventStatus.INVOICE_SENT,
      EventStatus.WIN,
    ),
  );

  const eventsReadyList = useSelector((state: any) =>
    getMainEventsByStatus(
      state,
      EventStatus.QUOTE_ACCEPTED,
      EventStatus.INVOICE_SENT,
      EventStatus.READY,
    ),
  );

  const lostEvents = useSelector((state: any) =>
    getMainEventsByStatus(state, EventStatus.LOST),
  );

  const pendingEvents = useSelector((state: any) =>
    getMainEventsByStatus(
      state,
      EventStatus.QUOTE_REJECTED,
      EventStatus.QUALIFICATION,
      EventStatus.QUOTE_SENT,
    ),
  );
  const pastEvents = useSelector((state: any) =>
    getMainEventsByStatus(
      state,
      EventStatus.DONE,
      EventStatus.INVOICE_SENT,
      EventStatus.INVOICE_OVERDUE,
      EventStatus.WIN,
    ),
  );
  const overdueEvents = useSelector((state: any) =>
    getMainEventsByStatus(state, EventStatus.INVOICE_OVERDUE),
  );

  const mainEventsSet = new Set<MainEvent>();

  newEventsList.forEach((event) => mainEventsSet.add(event));
  pendingEvents.forEach((event) => mainEventsSet.add(event));
  eventsReadyList.forEach((event) => mainEventsSet.add(event));
  eventsDoneList.forEach((event) => mainEventsSet.add(event));
  lostEvents.forEach((event) => mainEventsSet.add(event));

  const mainEvents: MainEvent[] = Array.from(mainEventsSet);

  const sortedNewEventsList = sortEvents(newEventsList);
  const sortedPendingEvents = sortPendingEvents(pendingEvents);
  const sortedEventsDoneList = sortDoneEvents(eventsDoneList);
  const sortedEventsReadyList = sortReadyEvents(eventsReadyList);
  const sortedLostEvents = sortLostEvents(lostEvents);
  const sortedEvents = sortEvents(mainEvents);
  const sortedPastEvents = sortPastEvents(pastEvents);
  const sortedOverdueEvents = sortOverdueEvents(overdueEvents);

  const EVENTS = {
    NEW:
      sortedNewEventsList && sortedNewEventsList.length
        ? getSubEventsFromPeriod(
            newEventsList.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],

    PENDING:
      sortedPendingEvents && sortedPendingEvents.length
        ? getSubEventsFromPeriod(
            pendingEvents.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    PAST:
      sortedPastEvents && sortedPastEvents.length
        ? getSubEventsFromPeriod(
            pastEvents.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    OVERDUE:
      sortedOverdueEvents && sortedOverdueEvents.length
        ? getSubEventsFromPeriod(
            overdueEvents.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    LOST:
      sortedLostEvents && sortedLostEvents.length
        ? getSubEventsFromPeriod(
            lostEvents.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    DONE:
      sortedEventsDoneList && sortedEventsDoneList.length
        ? getSubEventsFromPeriod(
            eventsDoneList.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    READY:
      sortedEventsReadyList && sortedEventsReadyList.length
        ? getSubEventsFromPeriod(
            eventsReadyList.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
    ALL:
      sortedEvents && sortedEvents.length
        ? getSubEventsFromPeriod(
            mainEvents.flatMap((e) => getSubEventsListFromMainEvents(e)),
            startDate,
            endDate,
          )
        : [],
  };

  const handleFilterChange = (value: string) => {
    switch (value) {
      case FILTER_OPTIONS.THIS_WEEK:
        setSelectedFilter(FILTER_OPTIONS.THIS_WEEK);
        setStartDate(getThisWeekDates()[0].toString());
        setEndDate(getThisWeekDates()[1].toString());
        break;
      case FILTER_OPTIONS.THIS_MONTH:
        setSelectedFilter(FILTER_OPTIONS.THIS_MONTH);
        setStartDate(getThisMonthDates()[0].toString());
        setEndDate(getThisMonthDates()[1].toString());
        break;
      case FILTER_OPTIONS.THIS_YEAR:
        setSelectedFilter(FILTER_OPTIONS.THIS_YEAR);
        setStartDate(getThisYearDates()[0].toString());
        setEndDate(getThisYearDates()[1].toString());
        break;
      case FILTER_OPTIONS.CUSTOM:
        setSelectedFilter(FILTER_OPTIONS.CUSTOM);
        break;
      default:
        break;
    }
  };

  const tabs = [
    {
      name: 'all',
      current: 'all' === searchParams.get('tab') ? true : false,
      events: EVENTS.ALL,
      pipeValue: getQuotePipeValueV2(mainEvents),
      animate: false,
    },
    {
      name: 'new',
      current: 'new' === searchParams.get('tab') ? true : false,
      events: EVENTS.NEW,
      pipeValue: getQuotePipeValueV2(newEventsList),
      animate: !!newEventsList.length,
    },
    {
      name: 'pending',
      current: 'pending' === searchParams.get('tab') ? true : false,
      events: EVENTS.PENDING,
      pipeValue: getQuotePipeValueV2(pendingEvents),
      animate: false,
    },
    {
      name: 'ready',
      current: 'ready' === searchParams.get('tab') ? true : false,
      events: EVENTS.READY,
      pipeValue: getQuotePipeValueV2(eventsReadyList),
      animate: false,
    },
    {
      name: 'done',
      current: 'done' === searchParams.get('tab') ? true : false,
      events: EVENTS.DONE,
      pipeValue: getQuotePipeValueV2(eventsDoneList),
      animate: false,
    },
    {
      name: 'lost',
      current: 'lost' === searchParams.get('tab') ? true : false,
      events: EVENTS.LOST,
      pipeValue: getQuotePipeValueV2(lostEvents),
      animate: false,
    },
  ];

  const current = tabs.find((tab) => tab.current) || tabs[0];

  useEffect(() => {
    fetchMainEvents();
  }, []);

  useEffect(() => {
    if (mainEvents && mainEvents.length > 0) {
      setSearchParams({
        tab: current.name,
        filter: selectedFilter,
        startDate: startDate,
        endDate: endDate,
      });
    }
  }, [selectedFilter, startDate, endDate]);

  return (
    <PageLayout>
      <div className="flex flex-col space-y-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {intl.formatMessage({
                id: 'events.header',
              })}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {intl.formatMessage({
                id: 'events.description',
              })}
            </p>
          </div>
          <div className="flex flex-1">
            <div className="ml-auto">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => setOpenNewEventModal(true)}
              >
                Ajouter un nouvel évènement
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="border-b border-gray-900/10">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <span
                  key={tab.name}
                  className={classNames(
                    tab.current
                      ? 'border-klaq-500 text-klaq-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium hover:cursor-pointer',
                  )}
                  onClick={() =>
                    setSearchParams({
                      filter: selectedFilter,
                      tab: tab.name,
                      startDate: startDate,
                      endDate: endDate,
                    })
                  }
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <span className="relative">
                    {!!tab.animate && (
                      <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-klaq-400 ring-2 ring-white animate-ping"></span>
                    )}
                    {intl.formatMessage({
                      id: `events.tabs.${tab.name}`,
                    })}
                  </span>
                </span>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex">
          <div className="flex-1">
            {mainEvents && mainEvents.length > 0 ? (
              <>
                <div className="pb-5 sm:flex sm:items-center flex flex-row">
                  <div className="flex">
                    <select
                      value={selectedFilter}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      id="location"
                      name="location"
                      className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-klaq-600 sm:text-sm sm:leading-6"
                    >
                      <option value={FILTER_OPTIONS.THIS_WEEK}>
                        {intl.formatMessage({
                          id: `events.filter.${FILTER_OPTIONS.THIS_WEEK.toLocaleLowerCase()}`,
                        })}
                      </option>
                      <option value={FILTER_OPTIONS.THIS_MONTH}>
                        {intl.formatMessage({
                          id: `events.filter.${FILTER_OPTIONS.THIS_MONTH.toLocaleLowerCase()}`,
                        })}
                      </option>
                      <option value={FILTER_OPTIONS.THIS_YEAR}>
                        {intl.formatMessage({
                          id: `events.filter.${FILTER_OPTIONS.THIS_YEAR.toLocaleLowerCase()}`,
                        })}
                      </option>
                      <option value={FILTER_OPTIONS.CUSTOM}>
                        {intl.formatMessage({
                          id: `events.filter.${FILTER_OPTIONS.CUSTOM.toLocaleLowerCase()}`,
                        })}
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center justify-center ml-4">
                    {/* <p className="max-w-2xl text-sm leading-6 text-gray-500">
                      {intl.formatMessage(
                        {
                          id: "events.pipe-value",
                        },
                        {
                          pipeValue: current.pipeValue,
                        }
                      )}
                    </p> */}
                  </div>
                  <div className="flex ml-auto space-x-3">
                    <div className="flex">
                      <input
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setSelectedFilter(FILTER_OPTIONS.CUSTOM);
                          setSearchParams({
                            filter: FILTER_OPTIONS.CUSTOM,
                          });
                        }}
                        type="date"
                        name="startDate"
                        id="startDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-klaq-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        -
                      </p>
                    </div>
                    <div className="flex">
                      <input
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setSelectedFilter(FILTER_OPTIONS.CUSTOM);
                          setSearchParams({
                            filter: FILTER_OPTIONS.CUSTOM,
                          });
                        }}
                        type="date"
                        name="endDate"
                        id="endDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-klaq-600 sm:text-sm sm:leading-6"
                        min={startDate}
                      />
                    </div>
                  </div>
                </div>
                {current.events && current.events.length > 0 ? (
                  <EventList
                    isLoading={isLoadingEvents}
                    subEvents={current.events}
                  />
                ) : (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <HandThumbUpIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 font-semibold text-gray-900">
                      {intl.formatMessage({
                        id: `events.no-events-in-tab.${current.name}`,
                      })}
                    </h3>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6">
                <button
                  onClick={() => setOpenNewEventModal(true)}
                  type="button"
                  className="relative block sm:w-1/2 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-klaq-500 focus:ring-offset-2"
                >
                  <PlusIcon
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  />

                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    {intl.formatMessage({
                      id: 'events.no-events',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {intl.formatMessage({
                      id: 'events.get-started',
                    })}
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <NewEventModal
        isOpen={shouldOpenNewEvent}
        setOpen={setOpenNewEventModal}
      />
    </PageLayout>
  );
};

export default Events;
