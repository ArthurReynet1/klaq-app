export const sortPendingEvents = (events: any[]) => {
  const customOrder = ['QUALIFICATION', 'QUOTE_REJECTED', 'QUOTE_SENT'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortEvents = (events: any[]) => {
  const customOrder = [
    'INBOX',
    'INVOICE_OVERDUE',
    'QUALIFICATION',
    'QUOTE_REJECTED',
    'QUOTE_ACCEPTED',
    'QUOTE_SENT',
    'INVOICE_SENT',
    'DONE',
    'READY',
    'WIN',
    'LOST',
  ];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortNewEvents = (events: any[]) => {
  const customOrder = ['INBOX'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortReadyEvents = (events: any[]) => {
  const customOrder = ['QUOTE_ACCEPTED', 'INVOICE_SENT', 'READY'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortDoneEvents = (events: any[]) => {
  const customOrder = ['INVOICE_OVERDUE', 'DONE', 'INVOICE_SENT', 'WIN'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortLostEvents = (events: any[]) => {
  const customOrder = ['LOST'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortPastEvents = (events: any[]) => {
  const customOrder = ['INVOICE_OVERDUE', 'DONE', 'INVOICE_SENT', 'WIN'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};

export const sortOverdueEvents = (events: any[]) => {
  const customOrder = ['INVOICE_OVERDUE'];

  return events.sort((a, b) => {
    const statusA = customOrder.indexOf(a.status);
    const statusB = customOrder.indexOf(b.status);

    // Trier en fonction de l'ordre personnalisé
    if (statusA < statusB) return -1;
    if (statusA > statusB) return 1;

    // Si les statuts sont les mêmes, trier par date
    if (new Date(a.date) < new Date(b.date)) return -1;
    if (new Date(a.date) > new Date(b.date)) return 1;

    return 0;
  });
};
