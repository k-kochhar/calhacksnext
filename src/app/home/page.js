"use client";

import { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import {
	Bars3Icon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Home", href: "/home", icon: HomeIcon, current: true },
	{ name: "Family", href: "/family", icon: UsersIcon, current: false },
	{ name: "Friends", href: "/friends", icon: FolderIcon, current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div className="flex h-screen text-neutral-700">
				{/* Desktop Sidebar */}
				<div className="flex flex-col min-w-64">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
						<div className="flex h-16 items-center">
							<img
								alt="Your Company"
								src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
								className="h-8 w-auto"
							/>
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<a
													href={item.href}
													className={classNames(
														item.current
															? "bg-gray-50 text-indigo-600"
															: "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
														"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
													)}
												>
													<item.icon
														aria-hidden="true"
														className={classNames(
															item.current
																? "text-indigo-600"
																: "text-gray-400 group-hover:text-indigo-600",
															"h-6 w-6 shrink-0"
														)}
													/>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>

								<li className="-mx-6 mt-auto">
									<a
										href="#"
										className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
									>
										<img
											alt=""
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											className="h-8 w-8 rounded-full bg-gray-50"
										/>
										<span className="sr-only">Your profile</span>
										<span aria-hidden="true">Joe Biden</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				{/* Content Area 1 */}
				<div className="w-1/2">
					<div className="p-10">
						<h1 className="text-2xl font-bold pb-4">Home</h1>
						<input
							type="text"
							placeholder="Search..."
							className="w-full p-4 border border-gray-300 rounded-md"
						/>
					</div>
				</div>

				{/* Content Area 2 */}
				<div className="w-1/2 border-l">
					<div className="p-10">
						<h1 className="text-2xl font-bold">Flagged Conversation</h1>
						<p>Blah Blah blah.</p>
					</div>
				</div>
			</div>
		</>
	);
}
