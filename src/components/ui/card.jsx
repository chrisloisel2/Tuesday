export function Card({ children, className }) {
	return (
		<div className={`rounded-lg shadow-lg bg-white p-6 z-10
		 ${className}`}>
			{children}
		</div>
	);
}

export function CardContent({ children, className }) {
	return <div className={className}>{children}</div>;
}
