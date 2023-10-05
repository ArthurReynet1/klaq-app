import { Dialog, Combobox, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Button } from "components/Button";
import { useState, useEffect, Fragment } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useFetchEvents } from "redux/Events/hooks";
import { getEventsByStatus } from "redux/Events/selectors";
import { Event, EventStatus } from "redux/Events/slices";
import { PATHS } from "routes";
import { classNames } from "utils/utils";
import { useNavigate } from "react-router-dom";

type CreateNewQuoteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateNewQuoteModal = (props: CreateNewQuoteModalProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { open, setOpen } = props;

  const [, fetchEvents] = useFetchEvents();
  const [query, setQuery] = useState("");
  const events = useSelector((state: any) =>
    getEventsByStatus(
      state,
      EventStatus.INBOX,
      EventStatus.QUALIFICATION,
      EventStatus.QUOTE_SENT,
      EventStatus.QUOTE_OPENED,
      EventStatus.QUOTE_REJECTED
    )
  );

  const filteredEvents =
    query === ""
      ? []
      : events.filter((event) => {
          return (
            event.customer.phone.toLowerCase().includes(query.toLowerCase()) ||
            event.eventType.toLowerCase().includes(query.toLowerCase()) ||
            event.customer.name.toLowerCase().includes(query.toLowerCase()) ||
            new Date(event.date)
              .toLocaleDateString()
              .toLowerCase()
              .includes(query.toLowerCase())
          );
        });

  const handleGenerate = (id: string) => {
    navigate(`/quote/generate/${id}`);
  };

  const handleCreateEvent = () => {
    navigate(PATHS.NEW_EVENT);
  };

  const handleLookEvent = (id: string) => {
    navigate(`${PATHS.EVENTS}/${id}`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(event: Event) => handleGenerate(event.id)}>
                {({ activeOption }) => (
                  <>
                    <div className="relative">
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Combobox.Input
                        className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder={intl.formatMessage({
                          id: "quote.attach-to-event.search",
                        })}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                    {(query === "" || filteredEvents.length > 0) && (
                      <Combobox.Options
                        as="div"
                        static
                        hold
                        className="flex divide-x divide-gray-100"
                      >
                        <div
                          className={classNames(
                            "max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4",
                            activeOption && "sm:h-96"
                          )}
                        >
                          {query === "" && (
                            <h2 className="mb-4 mt-2 text-xs font-semibold text-gray-500">
                              {intl.formatMessage({
                                id: "quote.attach-to-event.recent",
                              })}
                            </h2>
                          )}
                          <div className="-mx-2 text-sm text-gray-700">
                            {(query === ""
                              ? events.slice(0, 5)
                              : filteredEvents
                            ).map((event) => (
                              <Combobox.Option
                                as="div"
                                key={event.id}
                                value={event}
                                className={({ active }) =>
                                  classNames(
                                    "flex cursor-default select-none items-center rounded-md p-2",
                                    active && "bg-gray-100 text-gray-900"
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <span className="ml-3 flex-auto truncate">
                                      {new Date(
                                        event.date
                                      ).toLocaleDateString()}{" "}
                                      - {event.customer.name} -{" "}
                                      {intl.formatMessage({
                                        id: `events.status.${event.status}`,
                                      })}
                                    </span>
                                    {active && (
                                      <ChevronRightIcon
                                        className="ml-3 h-5 w-5 flex-none text-gray-400"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </div>
                        </div>
                        {activeOption && (
                          <div className="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                            <div className="flex-none p-6 text-center">
                              <h2 className="mt-3 font-semibold text-gray-900">
                                {intl.formatMessage(
                                  {
                                    id: "quote.attach-to-event.information.title",
                                  },
                                  {
                                    eventType: intl.formatMessage({
                                      id: `events.types.${activeOption.eventType}`,
                                    }),
                                    date: new Date(
                                      activeOption.date
                                    ).toLocaleDateString(),
                                    customerName: activeOption.customer.name,
                                  }
                                )}
                              </h2>
                              <p className="text-sm leading-6 text-gray-500">
                                <Button
                                  variant="link"
                                  color="primary"
                                  type="button"
                                  onClick={() =>
                                    handleLookEvent(activeOption.id)
                                  }
                                >
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.button.look-event",
                                  })}
                                </Button>
                              </p>
                            </div>
                            <div className="flex flex-auto flex-col justify-between p-6">
                              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.information.phone",
                                  })}
                                </dt>
                                <dd>{activeOption.customer.phone}</dd>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.information.number-of-guests",
                                  })}
                                </dt>
                                <dd className="truncate">
                                  {activeOption.numberOfGuests}
                                </dd>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.information.public-event",
                                  })}
                                </dt>
                                <dd>
                                  {activeOption.publicEvent === "yes" ? (
                                    <CheckIcon className="h-5 w-5" />
                                  ) : (
                                    <XMarkIcon className="h-5 w-5" />
                                  )}
                                </dd>
                                <dt className="col-end-1 font-semibold text-gray-900">
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.information.location",
                                  })}
                                </dt>
                                <dd className="truncate">
                                  {activeOption.city}
                                </dd>
                              </dl>
                              <div className="mx-auto">
                                <Button
                                  type="button"
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    handleGenerate(activeOption.id)
                                  }
                                >
                                  {intl.formatMessage({
                                    id: "quote.attach-to-event.button.generate",
                                  })}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Combobox.Options>
                    )}
                    {query !== "" && filteredEvents.length === 0 && (
                      <div className="px-6 py-14 text-center text-sm sm:px-14">
                        <UsersIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          {intl.formatMessage({
                            id: "quote.attach-to-event.not-found.title",
                          })}
                        </p>
                        <p className="mt-2 text-gray-500">
                          {intl.formatMessage(
                            {
                              id: "quote.attach-to-event.not-found.description",
                            },
                            {
                              btn: (...chunks: any) => (
                                <Button
                                  type="button"
                                  variant="link"
                                  color="primary"
                                  onClick={handleCreateEvent}
                                >
                                  {chunks.join()}
                                </Button>
                              ),
                            }
                          )}
                        </p>
                        <p className="mt-2 text-gray-500">
                          {intl.formatMessage({
                            id: "quote.attach-to-event.not-found.info",
                          })}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};