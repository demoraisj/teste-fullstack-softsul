/* eslint-disable react/no-unstable-nested-components */
import type { FC } from 'react';
import { useState } from 'react';
import type { PageProperties } from '../../main';
import type { TableColumn } from '../../components/Table';
import Table from '../../components/Table';
import EditBranch from './modals/EditBranch';
import type { Branch } from '../../services/httpService/types';
import { useIntervalEffect } from '../../hooks/useIntervalEffect';
import { cnpj } from '../../tools/masks';
import ShowBranch from './modals/ShowBranch';
import LocationModal from './modals/LocationModal';

const columns: TableColumn<Branch>[] = [
	{
		title: 'Nome',
		render: 'name',
	},

	{
		title: 'CNPJ',
		render: (branch: Branch) => cnpj.mask(branch.cnpj),
	},

	{
		title: 'Email',
		render: 'email',
	},

	{
		title: 'Cidade',
		render: (branch) => (
			<span className="p-1 border border-dashed border-gray-200 rounded">{branch.city}</span>
		),
	},
];

const Branches: FC<PageProperties> = (props) => {
	const { httpService } = props;

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [showModalOpen, setShowModalOpen] = useState(false);
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
	const [branches, setBranches] = useState<Branch[]>([]);

	const actions = Object.freeze({
		create() {
			setSelectedBranch(null);
			setEditModalOpen(true);
		},

		edit(branch: Branch) {
			setSelectedBranch(branch);
			setEditModalOpen(true);
		},

		show(branch: Branch) {
			setSelectedBranch(branch);
			setShowModalOpen(true);
		},

		location(branch: Branch) {
			setSelectedBranch(branch);
			setLocationModalOpen(true);
		},

		async delete(branch: Branch) {
			await httpService.deleteBranch(branch);

			setBranches(branches.filter((b) => b.id !== branch.id));
		},
	});

	useIntervalEffect(60000, [], () => {
		httpService.indexBranches().then((data) => setBranches(data));
	});

	return (
		<div>
			<div className="mt-4">
				<Table
					resourceName="Filial"
					items={branches}
					useAsKey="id"
					columns={columns}
					onDeleteBtnClick={(i) => actions.delete(i as Branch)}
					onEditBtnClick={(i) => actions.edit(i as Branch)}
					onCreateBtnClick={() => actions.create()}
					onVisualizeBtnClick={(i) => actions.show(i as Branch)}
					filter={{ propName: 'name', propUserFriendlyName: 'Nome' }}
					ExtraBtns={({ item }) => (
						<span
							role="button"
							className="text-secondary hover:text-primary mr-3 p-1 border border-gray-200 rounded-md hover:border-primary"
							onClick={() => actions.location(item as Branch)}
							onKeyUp={(e) => {
								if (e.key === 'Enter') actions.location(item as Branch);
							}}
						>
							Ver no mapa
						</span>
					)}
				/>
			</div>

			<EditBranch
				item={selectedBranch}
				open={editModalOpen}
				setOpen={setEditModalOpen}
				list={branches}
				setList={setBranches}
				httpService={httpService}
			/>

			<ShowBranch item={selectedBranch} open={showModalOpen} setOpen={setShowModalOpen} />

			<LocationModal item={selectedBranch} open={locationModalOpen} setOpen={setLocationModalOpen} />
		</div>
	);
};

export default Branches;
