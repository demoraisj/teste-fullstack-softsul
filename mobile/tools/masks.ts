export const cnpj = Object.freeze({
	mask(string: string) {
		let v = string ?? '';

		v = v.replace(/\D/g, ''); // Removes everything that is not a digit
		v = v.replace(/^(\d{2})(\d)/, '$1.$2'); // Put a period between the second and third digits
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Place a dot between the fifth and sixth digit
		v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Place a slash between the eighth and ninth digit
		v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Put a hyphen after the four-digit block

		return v.slice(0, 18); // Max length is 18 characters
	},

	unmask(string: string) {
		let v = string ?? '';

		v = v.replaceAll(/\D/g, ''); // Removes everything that is not a digit

		return v.slice(0, 14); // Max length is 14 characters
	},
});
