import React, { useState, useEffect } from "react";
import { fetchCategory } from "@/services/services";
import {
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";

interface CommandMenuProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const getCategories = async () => {
			const fetchedCategories = await fetchCategory();
			setCategories(fetchedCategories);
		};
		getCategories();
	}, []);

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}>
			<CommandInput placeholder="Search category..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup
					heading="Suggestions"
					className="no-scrollbar">
					{categories &&
						categories.map((category: any, index: number) => (
							<CommandItem key={index}>{category}</CommandItem>
						))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
