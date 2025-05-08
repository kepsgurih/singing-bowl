// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Error {
			code: string;
		}
		interface Locals {
			user: {
				id: string;
				fullName: string;
				email: string;
				phone: string;
				role: string;
				ig: string | null;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
