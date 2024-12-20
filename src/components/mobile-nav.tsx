"use client";

import { SidebarOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Logo from "./logo";
import { ny } from "@/lib/utils";
import { components } from "./navigation";
import { ModeToggle } from "@/components/mode-toggle";

interface MobileLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
	href: string;
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	...props
}: MobileLinkProps) {
	const router = useRouter();
	return (
		<a
			href={href}
			onClick={() => {
				router.push(href);
				onOpenChange?.(false);
			}}
			className={ny(className, "my-4")}
			{...props}
		>
			{children}
		</a>
	);
}

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<div className="space-between z-40 flex w-full items-center sm:hidden">
					<Logo className="ml-4 size-6" />
					<Button
						variant="ghost"
						className="ml-auto mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
					>
						<SidebarOpen className="size-6" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</div>
			</SheetTrigger>
			<SheetContent side="left" className="pr-0">
				<MobileLink
					href="/"
					className="flex items-center"
					onOpenChange={setOpen}
				>
					<Logo withText />
				</MobileLink>
				<ScrollArea className="mt-4 h-[calc(100dvh-8rem)] pl-6">
					<div className="flex flex-col space-y-3">
						<MobileLink href="/download" onOpenChange={setOpen}>
							<div>Download</div>
							<p className="text-xs opacity-60">
								Get the latest version of Zen Browser.
							</p>
						</MobileLink>
						<MobileLink href="/mods" onOpenChange={setOpen}>
							<div>Zen Mods</div>
							<p className="text-xs opacity-60">
								Customize your browsing experience.
							</p>
						</MobileLink>
						<MobileLink href="/release-notes" onOpenChange={setOpen}>
							<div>Release Notes</div>
							<p className="text-xs opacity-60">
								Stay up to date with the latest changes.
							</p>
						</MobileLink>
						<MobileLink
							href="https://patreon.com/zen_browser?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
							rel="noopener noreferrer"
							onOpenChange={setOpen}
							target="_blank"
						>
							<div>Donate {"<"}3</div>
							<p className="text-xs opacity-60">Support the project</p>
						</MobileLink>
						{components.map(
							({ title, href, description, isTargetBlank, rel }) => (
								<MobileLink
									href={href}
									key={href}
									target={isTargetBlank ? "_blank" : "_self"}
									onOpenChange={setOpen}
									rel={rel}
								>
									<div>{title}</div>
									<p className="text-xs opacity-60">{description}</p>
								</MobileLink>
							),
						)}
						<span className="-mt-4 flex w-full justify-end pr-4">
							<ModeToggle />
						</span>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
