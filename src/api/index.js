import { statusMapper } from '../constants';

const randomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
const randomString = () => Math.random().toString(36).substr(2, 10);
const randomBool = () => Boolean(Math.round(Math.random() * 10) % 2);
const randomDate = (offset = 10000000000) =>
  new Date(+new Date() - Math.floor(Math.random() * offset));

const randomwUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

const randomStatus = () => statusMapper[randomNumber(0, statusMapper.length)];

const rowGroupCreator = () => ({
  uuid: randomwUUID(),
  name: randomString(),
  sensors: randomNumber(0, 5000),
  is_secure: randomBool(),
  last_seen: randomDate(),
  status: randomStatus(),
});

const rowGroupDetailCreator = (status) => {
  return {
    uuid: randomwUUID(),
    name: randomString(),
    version: `${randomNumber(0, 10)}.${randomNumber(0, 10)}`,
    last_seen: randomDate(),
    status,
  };
};

export const fetchGroups = ({ perPage, page }) => {
  const currPage = page || 1;
  const currPerPage = perPage || 20;
  return insights.chrome.auth.getUser().then(() => ({
    results: [...new Array(currPerPage)].map(rowGroupCreator),
    meta: {
      count: 200,
      limit: currPerPage * currPage,
      offset: currPerPage * (currPage - 1),
    },
  }));
};

export const threshold = () => {
  const sections = randomNumber(2, 5);
  let rest = 100;
  return Promise.resolve({
    results: [...new Array(sections)].map(() => {
      const currPercent = randomNumber(0, rest);
      rest = rest - currPercent;
      return {
        [randomString()]: currPercent,
      };
    }),
  });
};

export const devicesInfo = () => {
  return Promise.resolve({
    results: {
      requiredApproval: randomNumber(0, 100),
      orphaned: randomNumber(0, 100),
      delivering: randomNumber(0, 100),
    },
  });
};

export const canariesInfo = () => {
  return Promise.resolve({
    results: {
      sensors: {
        time: randomDate(),
        status: randomStatus(),
      },
      scanners: {
        time: randomDate(),
        status: randomStatus(),
      },
      kiosks: {
        time: randomDate(),
        status: randomStatus(),
      },
      antenna: {
        time: randomDate(),
        status: randomStatus(),
      },
    },
  });
};

export const groupsDetail = (uuid, { page, perPage }) => {
  const currPage = page || 1;
  const currPerPage = perPage || 20;
  const status = randomStatus();
  return Promise.resolve({
    uuid,
    name: randomString(),
    results: [...new Array(currPerPage)].map(() =>
      rowGroupDetailCreator(status)
    ),
    meta: {
      count: 200,
      limit: currPerPage * currPage,
      offset: currPerPage * (currPage - 1),
    },
  });
};

export const groupDevicesInfo = (uuid) => {
  return Promise.resolve({
    uuid,
    total: 200,
    newDevices: randomNumber(0, 50),
    offlineDevices: randomNumber(0, 50),
    deliveringDevices: randomNumber(0, 50),
  });
};
