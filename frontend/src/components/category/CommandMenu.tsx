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

interface Category {
	id: string;
	name: string;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	useEffect(() => {
		const getCategories = async () => {
			try {
				const fetchedCategories: Category[] = await fetchCategory();
				setCategories(fetchedCategories);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		getCategories();
	}, []);

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}>
			<CommandInput placeholder="Search category..." />
			<CommandList >
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup
					heading="Suggestions"
					className="no-scrollbar">
					{categories.map((category, index) => (
						<CommandItem key={index}>{`${category}`}</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
