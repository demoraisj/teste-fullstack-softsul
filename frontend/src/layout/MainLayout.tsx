import type { FC, ReactNode } from 'react';
import type { AuthService } from '../services/authService';
import type { InterfaceService } from '../services/interfaceService';

type Props = {
	children: ReactNode;
	appUIService: InterfaceService;
	authService: AuthService;
};

const MainLayout: FC<Props> = (props) => {
	const { children } = props;

	return <div>{children}</div>;
};

export default MainLayout;
