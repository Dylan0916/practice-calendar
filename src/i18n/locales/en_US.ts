import { Weeks } from '../../types/commons';

const DAYS = Object.values(Weeks).slice(0, 7);

// prettier-ignore
export default {
  'schedule-title': 'Available times',
  'time-zone-desc':
    '* All times listed are in your local timezone: {{timeZone}}',
  'day': DAYS
};
