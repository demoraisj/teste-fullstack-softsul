import type { FC } from 'react';
import { useState } from 'react';
import type { PageProperties } from '../../main';
import type { TableColumn } from '../../components/Table';
import Table from '../../components/Table';
import EditBranch from '../../components/forms/EditBranch';
import type { Branch } from '../../services/httpService/types';
import { useIntervalEffect } from '../../hooks/useIntervalEffect';

const columns: TableColumn[] = [
	{
		title: 'Nome',
		render: 'name',
	},
];

const Branches: FC<PageProperties> = (props) => {
	const { httpService } = props;

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
	const [branches, setBranches] = useState<Branch[]>([]);

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
					onDeleteBtnClick={() => undefined}
					onEditBtnClick={() => undefined}
					onCreateBtnClick={() => setEditModalOpen(true)}
				/>
			</div>

			<EditBranch item={selectedBranch} open={editModalOpen} setOpen={setEditModalOpen} />
		</div>
	);
};

export default Branches;
