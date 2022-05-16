import type { FC } from 'react';
import { useRef, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DocumentTextIcon, EyeIcon } from '@heroicons/react/solid';
import type { Branch } from '../../services/httpService/types';
import Input from '../Input';
import { useSafeEffect } from '../../hooks/useSafeEffect';
import { cnpj } from '../../tools/masks';

type Props = {
	item: Branch | null;
	open: boolean;
	setOpen: (open: boolean) => void;
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

const ShowBranch: FC<Props> = (props) => {
	const { item, open, setOpen } = props;

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
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
							<Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
								<div>
									<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
										<EyeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
									</div>
									<div className="mt-3 sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-lg text-center leading-6 font-medium text-gray-900"
										>
											Visualizando {item?.name}
										</Dialog.Title>
										<div className="mt-2">
											<div>
												<div>
													<h3 className="text-lg leading-6 font-medium text-gray-900">
														Informações da Filial
													</h3>
													<p className="mt-1 max-w-2xl text-sm text-gray-500">
														Todos os dados cadastrados.
													</p>
												</div>
												<div className="mt-5 border-t border-gray-200">
													<dl className="sm:divide-y sm:divide-gray-200">
														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																Nome
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																{item?.name}
															</dd>
														</div>

														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																CNPJ
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																{cnpj.mask(item?.cnpj ?? '')}
															</dd>
														</div>

														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																Cidade
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																{item?.city}
															</dd>
														</div>

														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																Endereço
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																{item?.address}
															</dd>
														</div>

														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																Email
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																{item?.email}
															</dd>
														</div>

														<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
															<dt className="text-sm font-medium text-gray-500">
																Coordenadas
															</dt>
															<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																Latitude: {item?.lat} | Longitude: {item?.lng}
															</dd>
														</div>
													</dl>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-5">
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:col-start-1 sm:text-sm"
										onClick={() => setOpen(false)}
									>
										Fechar
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

export default ShowBranch;
