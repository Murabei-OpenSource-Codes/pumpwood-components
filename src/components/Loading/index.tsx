import { Spinner } from "../ui/spinner";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center mx-auto">
			<Spinner size={12} />
			<p className="mt-2 text-sm text-gray-500">Loading...</p>
		</div>
	);
}

export { Loading };
