import { filterDataToShowAvailableJobs } from "./utils";

const RealDate = Date.now;

// Mocking `Date.now()` so that our tests don't fail in future - filterDataToShowAvailableJobs is an impure function
// TODO: could get around this by making the util pure (i.e. take `Date.now()` as an argument)

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2020-07-01T00:00:00Z").getTime());
});

afterAll(() => {
  global.Date.now = RealDate;
});

// Note that there are two pieces of data with id "1242"... Mistake?
const mockResponseData = [
  {
    id: "1234",
    status: "DRAFT",
    startDatetime: "2018-05-19T16:50:00+00:00",
    endDatetime: "2018-05-19T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: {
      id: "1234",
      firstName: "Jane",
      lastName: "Doe",
    },
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1235",
    status: "POSTED",
    startDatetime: "2018-05-19T08:30:00+00:00",
    endDatetime: "2018-05-19T16:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "1235",
      name: "Manchester Hospital",
    },
    locum: null,
    hourlyRate: 85,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1236",
    status: "FILLED",
    startDatetime: "2020-11-23T07:50:00+00:00",
    endDatetime: "2020-11-23T14:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: {
      id: "1210",
      firstName: "John",
      lastName: "Smith",
    },
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1237",
    status: "COMPLETED",
    startDatetime: "2018-05-19T16:50:00+00:00",
    endDatetime: "2018-05-19T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "39181",
      name: "The Best Surgery",
    },
    locum: {
      id: "1234",
      firstName: "Jane",
      lastName: "Doe",
    },
    hourlyRate: 115,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1238",
    status: "POSTED",
    startDatetime: "2020-05-19T09:30:00+00:00",
    endDatetime: "2020-05-19T18:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "17718",
      name: "Birmigham Hospital",
    },
    locum: null,
    hourlyRate: 95,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1239",
    status: "DRAFT",
    startDatetime: "2018-05-19T16:50:00+00:00",
    endDatetime: "2018-05-19T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: null,
    hourlyRate: 67,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1240",
    status: "POSTED",
    startDatetime: "2020-08-21T09:30:00+00:00",
    endDatetime: "2020-08-21T20:30:00+00:00",
    applicationIds: [5512, 5517, 5519, 5590],
    practice: {
      id: "11812",
      name: "The fantastic GP Surgery",
    },
    locum: null,
    hourlyRate: 115,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1242",
    status: "DRAFT",
    startDatetime: "2018-05-19T16:50:00+00:00",
    endDatetime: "2018-05-19T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: null,
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1241",
    status: "POSTED",
    startDatetime: "2020-10-19T09:50:00+00:00",
    endDatetime: "2020-10-19T14:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "19212",
      name: "The surgert of the woods",
    },
    locum: null,
    hourlyRate: 100,
    staffType: "Practice Nurse",
    staffTypeId: "2",
  },
  {
    id: "1243",
    status: "POSTED",
    startDatetime: "2020-11-19T16:50:00+00:00",
    endDatetime: "2020-11-19T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "23314",
      name: "Grant Tree Medical Centre",
    },
    locum: null,
    hourlyRate: 85,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1244",
    status: "FILLED",
    startDatetime: "2018-05-19T16:50:00+00:00",
    endDatetime: "2018-05-19T19:15:00+00:00",
    applicationIds: [5512, 5511, 5513],
    practice: {
      id: "12342",
      name: "Cherry Blossom GP surgery",
    },
    locum: {
      id: "120019",
      firstName: "Hawking",
      lastName: "Strawberg",
    },
    hourlyRate: 75,
    staffType: "Climical Pharmacist",
    staffTypeId: "7",
  },
  {
    id: "1242",
    status: "POSTED",
    startDatetime: "2020-09-14T08:40:00+00:00",
    endDatetime: "2020-09-14T18:30:00+00:00",
    applicationIds: [5509, 5503],
    practice: {
      id: "199120",
      name: "West London Clinic",
    },
    locum: null,
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1245",
    status: "COMPLETED",
    startDatetime: "2020-05-19T16:50:00+00:00",
    endDatetime: "2020-05-19T19:15:00+00:00",
    applicationIds: [5501, 5502, 5501],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: {
      id: "1234",
      firstName: "Jane",
      lastName: "Doe",
    },
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1246",
    status: "POSTED",
    startDatetime: "2021-03-19T08:50:00+00:00",
    endDatetime: "2021-03-19T17:15:00+00:00",
    applicationIds: [5536, 5512, 5590, 5512],
    practice: {
      id: "1234",
      name: "Central London Hospital",
    },
    locum: null,
    hourlyRate: 100,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1247",
    status: "EXPIRED",
    startDatetime: "2019-11-22T16:50:00+00:00",
    endDatetime: "2019-11-22T19:15:00+00:00",
    applicationIds: [],
    practice: {
      id: "88101",
      name: "Bromley clinic & hospital",
    },
    locum: null,
    hourlyRate: 110,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1248",
    status: "EXPIRED",
    startDatetime: "2019-11-22T16:50:00+00:00",
    endDatetime: "2019-11-22T19:15:00+00:00",
    applicationIds: [5521, 5591, 5563],
    practice: {
      id: "88101",
      name: "Bromley clinic & hospital",
    },
    locum: null,
    hourlyRate: 110,
    staffType: "erp",
    staffTypeId: "3",
  },
  {
    id: "1249",
    status: "POSTED",
    startDatetime: "2019-11-22T16:50:00+00:00",
    endDatetime: "2019-11-22T19:15:00+00:00",
    applicationIds: [5503, 5504],
    practice: {
      id: "88101",
      name: "Bromley clinic & hospital",
    },
    locum: null,
    hourlyRate: 110,
    staffType: "erp",
    staffTypeId: "3",
  },
  {
    id: "1250",
    status: "POSTED",
    startDatetime: "2020-12-22T21:50:00+00:00",
    endDatetime: "2020-13-22T01:15:00+00:00", // TODO: this date doesn't exist btw!
    applicationIds: [5501, 5519],
    practice: {
      id: "10019",
      name: "The pink clinic",
    },
    locum: null,
    hourlyRate: 95,
    staffType: "gp",
    staffTypeId: "1",
  },
  {
    id: "1251",
    status: "POSTED",
    startDatetime: "2020-11-22T16:50:00+00:00",
    endDatetime: "2020-11-22T19:15:00+00:00",
    applicationIds: [5528, 5534, 5535, 5594],
    practice: {
      id: "84119",
      name: "Le meuilleur hopital",
    },
    locum: null,
    hourlyRate: 110,
    staffType: "Consultant",
    staffTypeId: "7",
  },
];

const filteredMockResponseData = [
  {
    applicationIds: [5512, 5517, 5519, 5590],
    endDatetime: "2020-08-21T20:30:00+00:00",
    hourlyRate: 115,
    id: "1240",
    locum: null,
    practice: { id: "11812", name: "The fantastic GP Surgery" },
    staffType: "gp",
    staffTypeId: "1",
    startDatetime: "2020-08-21T09:30:00+00:00",
    status: "POSTED",
  },
  {
    applicationIds: [],
    endDatetime: "2020-11-19T19:15:00+00:00",
    hourlyRate: 85,
    id: "1243",
    locum: null,
    practice: { id: "23314", name: "Grant Tree Medical Centre" },
    staffType: "gp",
    staffTypeId: "1",
    startDatetime: "2020-11-19T16:50:00+00:00",
    status: "POSTED",
  },
  {
    applicationIds: [5509, 5503],
    endDatetime: "2020-09-14T18:30:00+00:00",
    hourlyRate: 100,
    id: "1242",
    locum: null,
    practice: { id: "199120", name: "West London Clinic" },
    staffType: "gp",
    staffTypeId: "1",
    startDatetime: "2020-09-14T08:40:00+00:00",
    status: "POSTED",
  },
  {
    applicationIds: [5536, 5512, 5590, 5512],
    endDatetime: "2021-03-19T17:15:00+00:00",
    hourlyRate: 100,
    id: "1246",
    locum: null,
    practice: { id: "1234", name: "Central London Hospital" },
    staffType: "gp",
    staffTypeId: "1",
    startDatetime: "2021-03-19T08:50:00+00:00",
    status: "POSTED",
  },
];

describe("filterDataToShowAvailableJobs", () => {
  test("Takes in array of session objects and returns filtered array that only contains future, unclaimed GP sessions with valid start and end dates", () => {
    expect(filterDataToShowAvailableJobs(mockResponseData)).toEqual(
      filteredMockResponseData
    );
  });
});
