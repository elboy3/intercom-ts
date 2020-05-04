<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/musicplayce/intercom-ts">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">intercom-ts</h3>

  <p align="center">
    Intercom SDK made with Typescript intended for server-side use.
    <br />
    <a href="https://github.com/musicplayce/intercom-ts"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/MoonTory/theia-cli">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/musicplayce/intercom-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/musicplayce/intercom-ts/issues">Request Feature</a>
  </p>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- TABLE OF CONTENTS -->
# Table of Contents

- [Getting Started](#getting-started)
	- [Installing](#installing)
	- [Usage](#usage)
		- [Contacts](#contacts)
		- [Events](#events)
- [Built With](#built-with)
- [Versioning](#versioning)
- [Author(s)](<#author(s)>)
- [License](#license)

## Getting Started

**This SDK is intended for server-side use only. ***[Intercom](https://developers.intercom.com/building-apps/docs)*** offers their official [Javascript SDK](https://developers.intercom.com/v2.0/docs/intercom-javascript) for client-side operations.**
> **Currently the SDK only supports Intercom API Version 2.0**

### Installing

Using npm:

```bash
npm install @musicplayce/intercom-ts
```

Using yarn:

```bash
yarn add @musicplayce/intercom-ts
```

### Usage

Import the SDK into your project:
```typescript
import IntercomClient from '@musicplayce/intercom-ts';

// or use require
const IntercomClient = require('@musicplayce/intercom-ts');
```

Initialize a new client:


```typescript
const client = new IntercomClient({ token: 'YOUR_API_TOKEN_HERE' });

console.log(client.intercomVersion); // '2.0'
```

#### Contacts

Create:
```typescript
	const create = await client.contacts.create({
		role: 'user',
		external_id: 'ID IDENTIFIER IN YOUR SYSTEM',
		email: 'node_user@test.com',
		phone: '+5562999999999',
		name: 'Node Test User',
		avatar: 'URL TO AVATAR',
		signed_up_at: 1213313,
		last_seen_at: 123123,
		custom_attributes: {
			custom_attr1: 'custom_attribute_1',
			custom_attr2: 'custom_attribute_2'
		}
	});
```

Update:
```typescript
	const update = await client.contacts.update('', {
		role: 'user',
		external_id: '',
		email: 'lucas.mota@musicplayce.com',
		custom_attributes: {
			plan: 'free'
		}
	});
```

Delete:
```typescript
	const deleted = await client.contacts.delete('5ea1c76499abcb4afe7fb83f');
```

Find By Id:
```typescript
	const findById = await client.contacts.find({
		id: '5ea1c76499abcb4afe7fb83f' // Intercom Id
	});
```

Find By Email:
```typescript
	const findByEmail = await client.contacts.find({
		email: 'node_user@test.com'
	});
```

Find By External Id:
```typescript
	const findByExternalId = await client.contacts.find({
		external_id: '5ea1c76499abcb4afe7fb83f'
	});
```

Search Single Filter:
```typescript
	const searchSingleFilter = await client.contacts.search({
		field: 'custom_attributes.salesforce_status',
		operator: '~',
		value: 'open'
	});
```
Search Multiple Filter:
```typescript
	const searchMultipleFilters = await client.contacts.search({
		operator: 'AND',
		value: [
			{
				field: 'custom_attributes.social_network',
				operator: '=',
				value: 'facebook'
			},
			{
				field: 'custom_attributes.social_network',
				operator: '=',
				value: 'twitter'
			},
			{
				field: 'custom_attributes.social_network',
				operator: '=',
				value: 'instagram'
			}
		]
	});
```
Search Nested Filter:
```typescript
	const searchNestedFilters = await client.contacts.search({
		operator: 'AND',
		value: [
			{
				operator: 'OR',
				value: [
					{
						field: 'created_at',
						operator: '>',
						value: 1560436650
					},
					{
						field: 'signed_up_at',
						operator: '>',
						value: 1560436784
					}
				]
			},
			{
				operator: 'OR',
				value: [
					{
						field: 'custom_attributes.salseforce_status',
						operator: '~',
						value: 'Open'
					},
					{
						field: 'custom_attributes.salesforce_object_type',
						operator: '=',
						value: 'Lead'
					}
				]
			}
		]
	});
```

#### Events

Create:
```typescript
	const event = await client.events.create({
		event_name: 'click',
		created_at: 1571069751,
		email: 'node_user@test.com',
		metadata: {
			clicked: true
		}
	});
```

List customer events:
```typescript
	const eventList = await client.events.list({ email: '5ea1c76499abcb4afe7fb83f' })
	const eventList = await client.events.list({ intercom_user_id: '5ea1c76499abcb4afe7fb83f' })
```

> According to the [Intercom API](https://developers.intercom.com/intercom-api-reference/reference#list-user-events) you can only 'list' events that are less than 90 days old. Event counts and summaries will still include your events older than 90 days but you cannot 'list' these events individually if they are older than 90 days

## Built With

- [Typescript](https://www.typescriptlang.org/) - Typescript enables JavaScript developers to use highly-productive development tools and practices like static checking and code refactoring when developing JavaScript applications.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
- [lodash](https://github.com/lodash/lodash) - A modern JavaScript utility library delivering modularity, performance, & extras.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/MoonTory/theia-cli/tags).

## Author(s)

- **Gustavo Quinta** - _Initial work_ - [MoonTory](https://github.com/moontory)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
