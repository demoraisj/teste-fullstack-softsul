import type { FC, Key, ReactNode } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';

type Item = Record<string, unknown>;

export type TableColumn<I = Item> = {
	title: string;
	render: ((item: I) => ReactNode) | string;
	className?: string;
};

type Props = {
	resourceName: string;
	items: Item[];
	useAsKey: string;
	columns: TableColumn<any>[];
	onCreateBtnClick: () => void;
	onEditBtnClick: (item: Item) => void;
	onDeleteBtnClick: (item: Item) => void;
	onVisualizeBtnClick: (item: Item) => void;
	filter: {
		propName: string;
		propUserFriendlyName: string;
	};
};

const Table: FC<Props> = (props) => {
	const {
		items,
		columns,
		useAsKey,
		resourceName,
		onDeleteBtnClick,
		onEditBtnClick,
		onCreateBtnClick,
		onVisualizeBtnClick,
		filter,
	} = props;

	const [search, setSearch] = useState('');

	function filterItems(list: Item[], searchValue: string) {
		return list.filter((item) => {
			const itemValue = item[filter.propName];

			if (typeof itemValue === 'string' || typeof itemValue === 'number') {
				const treateditemVal = itemValue.toString().toLowerCase().trim();
				const treatedSearchVal = searchValue.toString().toLowerCase().trim();

				return treateditemVal.includes(treatedSearchVal);
			}

			return false;
		});
	}

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Lista</h1>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
						onClick={onCreateBtnClick}
					>
						Adicionar {resourceName}
					</button>
				</div>
			</div>

			<form className="w-full flex md:ml-0 mt-8 border border-dashed rounded-md px-4">
				<label htmlFor="search-field" className="sr-only">
					Filtrar filiais por ${filter.propUserFriendlyName.toLowerCase()}
				</label>
				<div className="relative w-full text-gray-400 focus-within:text-gray-600">
					<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
						<SearchIcon className="h-5 w-5" aria-hidden="true" />
					</div>
					<input
						id="search-field"
						className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
						placeholder={`Filtrar filiais por ${filter.propUserFriendlyName.toLowerCase()}`}
						type="search"
						name="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</form>

			{items.length > 0 ? (
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-300">
									<thead className="bg-gray-50">
										<tr>
											{columns.map((col, idx) => (
												<th
													scope="col"
													className={`text-left text-sm font-semibold text-gray-900 ${
														idx === 0 && 'pl-2'
													} ${col.className}`}
													key={col.title}
												>
													{col.title}
												</th>
											))}
											<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
												<span className="sr-only">Editar</span>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{filterItems(items, search).map((item) => (
											<tr key={item[useAsKey] as Key}>
												{columns.map((col) => (
													<td
														className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
														key={`${col.title}-${item[useAsKey]}`}
													>
														{typeof col.render === 'function'
															? col.render(item)
															: (item[col.render] as ReactNode)}
													</td>
												))}

												<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
													<span
														role="button"
														className="text-secondary hover:text-primary mr-3 p-1 border border-gray-200 rounded-md hover:border-primary"
														onClick={() => onVisualizeBtnClick(item)}
														onKeyUp={(e) => {
															if (e.key === 'Enter') onVisualizeBtnClick(item);
														}}
													>
														Visualizar
													</span>

													<span
														role="button"
														className="text-secondary hover:text-primary mr-3 p-1 border border-gray-200 rounded-md hover:border-primary"
														onClick={() => onEditBtnClick(item)}
														onKeyUp={(e) => {
															if (e.key === 'Enter') onEditBtnClick(item);
														}}
													>
														Editar
													</span>

													<span
														role="button"
														className="text-secondary hover:text-primary p-1 border border-gray-200 rounded-md hover:border-primary"
														onClick={() => onDeleteBtnClick(item)}
														onKeyUp={(e) => {
															if (e.key === 'Enter') onDeleteBtnClick(item);
														}}
													>
														Apagar
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="flex py-10 justify-center items-center border border-dashed border-gray-300 border-4 rounded-md mt-5">
					<span>Nenhum item cadastrado, ainda.</span>
				</div>
			)}
		</div>
	);
};

export default Table;
