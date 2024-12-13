import createClient from 'openapi-fetch';
import { goActiveApiBaseUrl } from '../config/index';

import type { paths } from './v1-prealpha';

export const { POST, GET } = createClient<paths>({ baseUrl: goActiveApiBaseUrl });