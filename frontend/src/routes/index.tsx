import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo-light2.png';
import type { PageProperties } from '../main';
import Input from '../components/Input';
import type { RegisterPayload } from '../services/httpService/types';

const Root: FC<PageProperties> = (props) => {
	const { authService, interfaceService } = props;

	const [isRegistering, setIsRegistering] = useState(false);
	const [error, setError] = useState('');
	const [form, setForm] = useState<RegisterPayload>({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const nav = useNavigate();

	function setFormData(key: keyof RegisterPayload, value: RegisterPayload[keyof RegisterPayload]) {
		setForm({ ...form, [key]: value });
	}

	async function onRegisterClick() {
		if (!isRegistering) {
			setIsRegistering(true);
			return;
		}

		if (Object.values(form).some((value) => value === '')) {
			setError('Por favor, preencha todos os campos.');
			return;
		}

		if (form.password !== form.password_confirmation) {
			setError('A senha e a confirmação devem ser iguais.');
		}

		const ok = await authService.register(form);

		if (ok) {
			nav('/dashboard');

			setTimeout(() => {
				interfaceService.notify('success', 'Registro efetuado, bem vindo.');
			}, 500);
		} else {
			setError('Ocorreu um erro ao registrar. Por favor, tente novamente.');
		}
	}

	async function login() {
		await authService.login({
			email: form.email,
			password: form.password,
		});

		nav('/dashboard');
	}
	return (
		<div className="min-h-full h-screen bg-secondary flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img className="mx-auto h-12 w-auto" src={logo} alt="Softsul" />
				<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Controle de Filiais</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<h1 className="text-center text-2xl font-bold mb-3 text-secondary">
						{isRegistering ? 'Registrar' : 'Entrar'}
					</h1>

					<form className="space-y-6">
						{isRegistering && (
							<Input
								label="Nome"
								name="name"
								type="text"
								autoComplete="name"
								value={form.name}
								setter={(value) => setFormData('name', value)}
								required
							/>
						)}

						<Input
							label="E-mail"
							name="email"
							type="email"
							autoComplete="email"
							value={form.email}
							setter={(value) => setFormData('email', value)}
							required
						/>

						<Input
							label="Senha"
							name="password"
							type="password"
							autoComplete="current-password"
							value={form.password}
							setter={(value) => setFormData('password', value)}
							required
						/>

						{isRegistering && (
							<Input
								label="Confirmar Senha"
								name="confirm_password"
								type="password"
								autoComplete="confirm-password"
								value={form.password_confirmation}
								setter={(value) => setFormData('password_confirmation', value)}
								required
							/>
						)}

						{!isRegistering && (
							<>
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
										type="button"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
										onClick={login}
									>
										Entrar
									</button>
								</div>
							</>
						)}

						<div>
							<button
								type="button"
								className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
									isRegistering ? 'bg-primary' : 'bg-secondary'
								}`}
								onClick={onRegisterClick}
							>
								{isRegistering ? 'Enviar' : 'Registrar'}
							</button>
						</div>

						<div className="text-center">
							<span className="text-sm text-center text-red-600">{error}</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Root;
