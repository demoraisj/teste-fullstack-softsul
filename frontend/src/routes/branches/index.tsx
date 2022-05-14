import type { FC } from 'react';
import { useState } from 'react';
import type { PageProperties } from '../../main';
import type { TableColumn } from '../../components/Table';
import Table from '../../components/Table';
import EditBranch from '../../components/forms/EditBranch';
import type { Branch } from '../../services/httpService/types';

const columns: TableColumn[] = [
	{
		title: 'Nome',
		render: 'name',
	},
];

const Branches: FC<PageProperties> = () => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

	return (
		<div>
			<div className="mt-4">
				<Table
					resourceName="Filial"
					items={[]}
					key="id"
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
