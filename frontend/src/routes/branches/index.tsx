import type { FC } from 'react';
import type { PageProperties } from '../../main';
import type { TableColumn } from '../../components/Table';
import Table from '../../components/Table';

const columns: TableColumn[] = [
	{
		title: 'Nome',
		render: 'name',
	},
];

const Branches: FC<PageProperties> = () => {
	console.log();

	return (
		<div>
			<div className="mt-4">
				<Table resourceName="Filial" items={[]} key="id" columns={columns} />
			</div>
		</div>
	);
};

export default Branches;
