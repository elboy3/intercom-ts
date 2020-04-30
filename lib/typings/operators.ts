export type Equals = '=';
export type DoesNotEqual = '!=';
export type In = 'IN';
export type NotIn = 'NIN';
export type GreaterOrEqualThan = '>';
export type LowerOrEqualThan = '<';
export type Contains = '~';
export type DoesNotContain = '!~';
export type StartsWith = '^';
export type EndsWith = '$';
export type And = 'AND';
export type Or = 'OR';

export type IntercomOperators =
	| Equals
	| DoesNotEqual
	| In
	| NotIn
	| GreaterOrEqualThan
	| LowerOrEqualThan
	| Contains
	| DoesNotContain
	| StartsWith
	| EndsWith
	| And
	| Or;
