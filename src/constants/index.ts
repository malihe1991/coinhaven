export const CONST = {
	COUNTRIES_BASE_URL: 'https://countries.trevorblades.com/',
	COINS_BASE_URL: 'wss://fcsapi.com',
	API_KEY: 'API_KEY',
	CURRENCY_ID: '1,2,3', // 1,1984,80,81,7774,7778,
	SOCKET_CONFIG: {
		transports: ['websocket'],
		path: '/v3/'
	},
	COUNTRIES_INFO: {
		'United States': {
			ratio: 1,
			abbreviation: 'USD',
			symbol: '$'
		},
		Germany: {
			ratio: 1.02,
			abbreviation: 'EUR',
			symbol: '€'
		},
		Ukraine: {
			ratio: 0.041,
			abbreviation: 'UAH',
			symbol: '₴'
		},
		Hungary: {
			ratio: 2.52,
			abbreviation: 'HUF',
			symbol: 'Ft'
		}
	}
};
