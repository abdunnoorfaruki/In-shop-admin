"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PopeoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopeoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formatedItems = items.map((store) => ({
    label: store.name,
    value: store.id,
  }));

  const currentStore = formatedItems.find(
    (store) => store.value === params.storeId
  );
  const [open, setOpen] = useState<boolean>(false);
  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a  store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store" />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup>
              {formatedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer "
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {store.label}
                    <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100":"opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandGroup>
            <CommandList>
                <CommandItem onSelect={() =>{
                    setOpen(false);
                    storeModal.onOpen()
                }} className="cursor-pointer" >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create new store
                </CommandItem>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
