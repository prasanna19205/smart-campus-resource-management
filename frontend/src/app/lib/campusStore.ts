
export type CampusEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  organizer: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type VenueRequest = {
  id: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  organizer: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type ResourceRequest = {
  id: string;
  resource: string;
  quantity: number;
  purpose: string;
  requestedBy: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type Registration = {
  eventId: string;
  eventName: string;
  studentName: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: string;
};

export type Feedback = {
  id: string;
  studentName: string;
  email: string;
  message: string;
  date: string;
  status: "Pending" | "Reviewed";
};

const KEYS = {
  events: "campusEvents",
  venues: "venueRequests",
  resources: "resourceRequests",
  registrations: "eventRegistrations",
  feedback: "campusFeedback",
};

function readData<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T[] : [];
  } catch {
    return [];
  }
}

function writeData<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(data));
}

export function getEvents(): CampusEvent[] {
  return readData<CampusEvent>(KEYS.events);
}

export function saveEvent(event: CampusEvent): void {
  const events = getEvents();
  writeData(KEYS.events, [...events, event]);
}

export function updateEventStatus(
  id: string,
  status: CampusEvent["status"]
): void {
  const events = getEvents().map((event) =>
    event.id === id ? { ...event, status } : event
  );
  writeData(KEYS.events, events);
}

export function getVenueRequests(): VenueRequest[] {
  return readData<VenueRequest>(KEYS.venues);
}

export function saveVenueRequest(request: VenueRequest): void {
  writeData(KEYS.venues, [...getVenueRequests(), request]);
}

export function updateVenueStatus(
  id: string,
  status: VenueRequest["status"]
): void {
  const requests = getVenueRequests().map((request) =>
    request.id === id ? { ...request, status } : request
  );
  writeData(KEYS.venues, requests);
}

export function getResourceRequests(): ResourceRequest[] {
  return readData<ResourceRequest>(KEYS.resources);
}

export function saveResourceRequest(request: ResourceRequest): void {
  writeData(KEYS.resources, [...getResourceRequests(), request]);
}

export function updateResourceStatus(
  id: string,
  status: ResourceRequest["status"]
): void {
  const requests = getResourceRequests().map((request) =>
    request.id === id ? { ...request, status } : request
  );
  writeData(KEYS.resources, requests);
}

export function getRegistrations(): Registration[] {
  return readData<Registration>(KEYS.registrations);
}

export function getFeedback(): Feedback[] {
  return readData<Feedback>(KEYS.feedback);
}

export function saveFeedback(feedback: Feedback): void {
  writeData(KEYS.feedback, [...getFeedback(), feedback]);
}
