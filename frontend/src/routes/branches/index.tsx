import type { FC } from 'react';
import { useState } from 'react';
import type { PageProperties } from '../../main';
import type { TableColumn } from '../../components/Table';
import Table from '../../components/Table';
import EditBranch from '../../components/forms/EditBranch';
import type { Branch } from '../../services/httpService/types';
import { useIntervalEffect } from '../../hooks/useIntervalEffect';

const columns: TableColumn<Branch>[] = [
	{
		title: 'Nome',
		render: 'name',
	},

	{
		title: 'CNPJ',
		render: 'cnpj',
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
		</div>
	);
};

export default Branches;
