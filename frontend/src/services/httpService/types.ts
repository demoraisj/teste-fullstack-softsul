export type Branch = {
	id: number;
	name: string;
	address: string;
	city: string;
	cnpj: string;
	email: string;
	lat: number;
	lng: number;
};

export type UserData = {
	id: number;
	name: string;
	email: string;
};

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};
