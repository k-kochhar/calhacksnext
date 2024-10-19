export const metadata = {
	title: "Family",
	description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
	return (
		<div className="min-h-screen bg-white">
			<main className="h-full">{children}</main>
		</div>
	);
}
