import type { FC } from 'react';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { useSubscribeService } from '../../hooks/useSubscribeService';
import type { InterfaceService } from '../../services/interfaceService';

const Notification: FC<{ interfaceService: InterfaceService }> = (props) => {
	const { interfaceService } = props;

	const [show, setShow] = useState(false);
	const [message, setMessage] = useState('Texto da mensagem aqui.');
	const [textClass, setTextClass] = useState('text-green-800');
	const [wrapperClass, setWrapperClass] = useState('border-l-4 border-green-500 bg-green-100');

	useSubscribeService(interfaceService, (store) => {
		setShow(store.notifications.opened);
		setMessage(store.notifications.message);

		switch (store.notifications.type) {
			case 'success':
				setTextClass('text-green-800');
				setWrapperClass('border-l-4 border-green-500 bg-green-100');
				break;
			case 'error':
				setTextClass('text-red-800');
				setWrapperClass('border-l-4 border-red-500 bg-red-100');
				break;
			case 'info':
				setTextClass('text-blue-800');
				setWrapperClass('border-l-4 border-blue-500 bg-blue-100');
				break;
			case 'warning':
				setTextClass('text-orange-800');
				setWrapperClass('border-l-4 border-orange-500 bg-orange-100');
				break;
			default:
				setTextClass('text-gray-800');
				setWrapperClass('border-l-4 border-gray-500 bg-gray-100');
				break;
		}
	});

	return (
		<div
			aria-live="assertive"
			className="fixed inset-0 inset-y-12 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
		>
			<div className="w-full flex flex-col items-center space-y-4 sm:items-end">
				<Transition
					show={show}
					as={Fragment}
					enter="transform ease-out duration-300 transition"
					enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
					enterTo="translate-y-0 opacity-100 sm:translate-x-0"
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${wrapperClass}`}
					>
						<div className="p-4">
							<div className="flex items-start">
								<div className="ml-3 w-0 flex-1 pt-0.5">
									<p className={`text-sm font-medium ${textClass}`}>{message}</p>
								</div>
								<div className="ml-4 flex-shrink-0 flex">
									<button
										type="button"
										className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
										onClick={() => {
											setShow(false);
										}}
									>
										<span className="sr-only">Fechar</span>
										<XIcon className="h-5 w-5" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	);
};

export default Notification;
