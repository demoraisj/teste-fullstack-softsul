import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';

type Props = {
	children: ReactNode;
};

const pageTitles: Record<string, string> = {
	'/dashboard': 'Painel',
};

const MainLayout: FC<Props> = (props) => {
	const { children } = props;

	const location = useLocation();

	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="main-layout">
			<Drawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<div className="md:pl-64 flex flex-col">
				<Header setSidebarOpen={setSidebarOpen} />

				<main className="flex-1">
					<div className="py-6">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
							<h1 className="text-2xl font-semibold text-gray-900">
								{pageTitles[location.pathname]}
							</h1>
						</div>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
