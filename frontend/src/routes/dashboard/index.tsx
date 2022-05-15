import type { FC } from 'react';
import { useEffect } from 'react';
import type { PageProperties } from '../../main';

const Dashboard: FC<PageProperties> = (props) => {
	const { interfaceService, storageService } = props;

	useEffect(() => {
		storageService.getUserData().then((user) => {
			interfaceService.notify('info', `Bem vindo, ${user.name}!`);
		});
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};

export default Dashboard;
