import type { FC } from 'react';
import { useRef, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DocumentTextIcon } from '@heroicons/react/solid';
import type { Branch } from '../../../services/httpService/types';
import Input from '../../../components/Input';
import type { HttpService } from '../../../services/httpService';
import { useSafeEffect } from '../../../hooks/useSafeEffect';
import { cnpj } from '../../../tools/masks';

type Props = {
	item: Branch | null;
	open: boolean;
	setOpen: (open: boolean) => void;
	list: Branch[];
	setList: (list: Branch[]) => void;
	httpService: HttpService;
};

const emptyForm: Branch = {
	id: 0,
	name: '',
	email: '',
	address: '',
	city: '',
	cnpj: '',
	lat: 0,
	lng: 0,
};

const EditBranch: FC<Props> = (props) => {
	const { item, open, setOpen, httpService, list, setList } = props;

	const [form, setForm] = useState<Branch>(emptyForm);

	const initialFocusRef = useRef(null);

	const isEditing = item && item.id > 0;

	function setFormData(key: keyof Branch, value: Branch[keyof Branch]) {
		setForm({ ...form, [key]: value });
	}

	async function save() {
		if (isEditing) {
			const updated = await httpService.updateBranch(form);
			const index = list.findIndex((i) => i.id === form.id);

			if (index >= 0) {
				const newList = [...list];
				newList[index] = updated;
				setList(newList);
			}
		} else {
			const created = await httpService.createBranch(form);

			setList([...list, created]);
		}

		setOpen(false);
	}

	useSafeEffect(() => {
		setForm(item || emptyForm);
	}, [item]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={initialFocusRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:p-6 max-w-2xl sm:w-full">
								<div>
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
										<DocumentTextIcon
											className="h-6 w-6 text-green-600"
											aria-hidden="true"
										/>
									</div>
									<div className="mt-3 sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-lg text-center leading-6 font-medium text-gray-900"
										>
											{isEditing ? `Editando Filial: ${item.name}` : 'Criando Filial'}
										</Dialog.Title>
										<div className="mt-2">
											<form name="branch">
												<div className="grid grid-cols-2 space-y-3">
													<div className="col-span-2">
														<Input
															name="name"
															label="Nome"
															value={form.name}
															type="text"
															setter={(value) => setFormData('name', value)}
															reactRef={initialFocusRef}
															required
														/>
													</div>

													<div className="col-span-1 mr-2">
														<Input
															name="email"
															label="Email"
															value={form.email}
															type="email"
															setter={(value) => setFormData('email', value)}
															required
														/>
													</div>

													<div className="col-span-1 ml-2">
														<Input
															name="city"
															label="Cidade"
															value={form.city}
															type="text"
															setter={(value) => setFormData('city', value)}
															required
														/>
													</div>

													<div className="col-span-1 mr-2">
														<Input
															name="address"
															label="Endereço"
															value={form.address}
															type="text"
															setter={(value) => setFormData('address', value)}
															required
														/>
													</div>

													<div className="col-span-1 ml-2">
														<Input
															name="cnpj"
															label="CNPJ"
															value={cnpj.mask(form.cnpj)}
															type="text"
															setter={(value) =>
																setFormData(
																	'cnpj',
																	cnpj.unmask(value as string)
																)
															}
															required
														/>
													</div>

													<div className="col-span-1 mr-2">
														<Input
															name="lat"
															label="Latitude"
															value={form.lat}
															type="text"
															setter={(value) => setFormData('lat', value)}
															required
														/>
													</div>

													<div className="col-span-1 ml-2">
														<Input
															name="lng"
															label="Longitude"
															value={form.lng}
															type="text"
															setter={(value) => setFormData('lng', value)}
															required
														/>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
									<button
										type="button"
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:col-start-2 sm:text-sm"
										onClick={save}
									>
										Salvar
									</button>
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
										onClick={() => setOpen(false)}
									>
										Cancelar
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default EditBranch;
