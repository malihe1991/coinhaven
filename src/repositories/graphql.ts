import { gql } from 'graphql-request';

export const countriesQuery = gql`
		{
			t1: country(code: "US") {
				name
				emoji
			}
			t2: country(code: "DE") {
				name
				emoji
			}
			t3: country(code: "UA") {
				name
				emoji
			}
			t4: country(code: "HU") {
				name
				emoji
			}
		}
	`;