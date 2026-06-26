import type { ReactNode } from "react";
import { Alert } from "../ui/alert";

interface ErrorBoundaryProps {
	children: ReactNode;
	hasError: boolean;
	message?: string;
	className?: string;
}

const ErrorBoundary = ({
	children,
	hasError,
	message = "Um erro inesperado ocorreu.",
}: ErrorBoundaryProps) => {
	if (hasError) {
		return (
			<Alert variant="destructive" className="my-2">
				{message}
			</Alert>
		);
	}

	return <>{children}</>;
};

export default ErrorBoundary;
export { ErrorBoundary };
