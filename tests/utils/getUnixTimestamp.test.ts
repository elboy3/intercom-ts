import { describe, it } from 'mocha';
import { assert, expect } from 'chai';

import { getUnixTimestamp } from '../../lib/utils';

describe('getUnixTimestamp', function () {
	it('should return a number representing a unix timestamp', function () {
		const date = new Date();
		const timestamp = getUnixTimestamp(date);

		assert.isNumber(timestamp);
	});
});
