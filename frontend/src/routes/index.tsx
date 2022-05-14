import type { FC } from 'react';
import logo from '../assets/logo-light2.png';
import type { PageProperties } from '../main';

const Root: FC<PageProperties> = () => {
	console.log();

	return (
		<div className="min-h-full h-screen bg-secondary flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img className="mx-auto h-12 w-auto" src={logo} alt="Softsul" />
				<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Controle de Filiais</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								E-mail
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Senha
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center" />

							<div className="text-sm">
								<a href="#" className="font-medium text-primary hover:text-primary">
									Esqueceu sua senha?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
							>
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Root;
