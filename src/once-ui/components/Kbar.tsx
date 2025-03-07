 "use client";

import React, { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Flex, Text, Icon, Column, Input, Option } from ".";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import styles from "./Kbar.module.scss";

// Define the KbarItem interface
export interface KbarItem {
  id: string;
  name: string;
  section?: string;
  shortcut?: string[];
  keywords?: string;
  perform?: () => void;
  href?: string;
  icon?: string;
  hasPrefix?: ReactNode;
  hasSuffix?: ReactNode;
  description?: ReactNode;
}

// Define a custom section header component
const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <Flex 
    paddingX="12"
    paddingY="8"
    textVariant="label-default-s"
    onBackground="neutral-medium">
    {label}
  </Flex>
);

// Define the Kbar component props
interface KbarProps {
  items: KbarItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const KbarContent: React.FC<KbarProps> = ({ items, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Process items to add icons as prefix if needed
  const processedItems = useCallback(() => {
    return items.map(item => {
      const processedItem = { ...item };
      
      // If icon is specified but no hasPrefix is provided, create the prefix from the icon
      if (item.icon && !item.hasPrefix) {
        processedItem.hasPrefix = <Icon name={item.icon} size="xs" onBackground="neutral-weak" />;
      }
      
      // If shortcut array is provided but no hasSuffix, create the suffix from the shortcut
      if (item.shortcut && item.shortcut.length > 0 && !item.hasSuffix) {
        processedItem.hasSuffix = (
          <Flex gap="4">
            {item.shortcut.map((key, index) => (
              <Text key={index} variant="label-strong-xs" onBackground="neutral-weak">
                {key}
              </Text>
            ))}
          </Flex>
        );
      }
      
      return processedItem;
    });
  }, [items]);

  // Filter items based on search query
  useEffect(() => {
    const processed = processedItems();
    
    if (!searchQuery) {
      // Convert items to the format expected by Select
      const selectOptions = processed.map((item) => ({
        label: item.name,
        value: item.id,
        hasPrefix: item.hasPrefix,
        hasSuffix: item.hasSuffix,
        description: item.description,
        href: item.href,
        onClick: () => {
          if (item.perform) {
            item.perform();
          }
          onClose();
        },
      }));
      
      setFilteredItems(selectOptions);
      return;
    }

    // Filter items based on name and keywords
    const filtered = processed
      .filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const keywordsMatch = item.keywords?.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || keywordsMatch;
      })
      .map((item) => ({
        label: item.name,
        value: item.id,
        hasPrefix: item.hasPrefix,
        hasSuffix: item.hasSuffix,
        description: item.description,
        href: item.href,
        onClick: () => {
          if (item.perform) {
            item.perform();
          }
          onClose();
        },
      }));

    setFilteredItems(filtered);
    // Reset highlighted index when search query changes
    setHighlightedIndex(filtered.length > 0 ? 0 : null);
  }, [searchQuery, processedItems, onClose]);

  // Group items by section
  const groupedItems = useCallback(() => {
    const grouped: Record<string, any[]> = {};
    
    filteredItems.forEach((item) => {
      const section = items.find((i) => i.id === item.value)?.section || "General";
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(item);
    });
    
    // Convert to array format expected by Select
    const result: any[] = [];
    
    Object.entries(grouped).forEach(([section, sectionItems]) => {
      // Add section header as a custom component
      result.push({
        label: <SectionHeader label={section} />,
        value: `section-${section}`,
        isCustom: true, // Flag to identify custom components
        disabled: true,
      });
      
      // Add section items
      result.push(...sectionItems);
    });
    
    return result;
  }, [filteredItems, items]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const options = groupedItems().filter(item => !item.isCustom);
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return 0;
          return (prevIndex + 1) % options.length;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return options.length - 1;
          return (prevIndex - 1 + options.length) % options.length;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex !== null) {
          const selectedOption = options[highlightedIndex];
          if (selectedOption) {
            // Find the original item to get the perform function or href
            const originalItem = items.find(item => item.id === selectedOption.value);
            if (originalItem) {
              if (originalItem.href) {
                // Handle navigation
                router.push(originalItem.href);
              } else if (originalItem.perform) {
                // Execute the perform function
                originalItem.perform();
              }
              // Close the Kbar
              onClose();
            }
          }
        }
        break;
      default:
        break;
    }
  }, [groupedItems, highlightedIndex, onClose, items, router]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Lock body scroll when kbar is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position when kbar is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Clear search query when kbar is closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setHighlightedIndex(null);
    } else {
      // Set the first item as highlighted when opened
      const options = groupedItems().filter(item => !item.isCustom);
      if (options.length > 0) {
        setHighlightedIndex(0);
      }
    }
  }, [isOpen, groupedItems]);

  // Focus search input when kbar is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Render nothing if not open
  if (!isOpen) return null;

  // Get non-custom options for highlighting
  const nonCustomOptions = groupedItems().filter(item => !item.isCustom);
  
  // Create portal for the kbar
  return createPortal(
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={10}
      center
      background="overlay"
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <Column
        ref={containerRef}
        maxWidth="xs"
        background="surface"
        radius="l"
        border="neutral-alpha-medium"
        overflow="hidden"
        shadow="l"
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex fillWidth position="relative">
          <Input
            id="kbar-search"
            label="Search docs..."
            labelAsPlaceholder
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            hasPrefix={<Icon name="search" size="xs" />}
            radius="none"
            style={{
              marginTop: "-1px",
              marginLeft: "-1px",
              width: "calc(100% + 2px)",
            }}
          />
        </Flex>
        <Column fillWidth padding="4" gap="2">
          {groupedItems().map((option, index) => {
            if (option.isCustom) {
              return (
                <React.Fragment key={option.value}>
                  {option.label}
                </React.Fragment>
              );
            }
            
            // Find the index in the non-custom options array
            const optionIndex = nonCustomOptions.findIndex(item => item.value === option.value);
            const isHighlighted = optionIndex === highlightedIndex;
            
            return (
              <Option
                key={option.value}
                label={option.label}
                value={option.value}
                hasPrefix={option.hasPrefix}
                hasSuffix={option.hasSuffix}
                description={option.description}
                href={option.href}
                onClick={option.href ? () => onClose() : option.onClick}
                highlighted={isHighlighted}
              />
            );
          })}
          {searchQuery && filteredItems.length === 0 && (
            <Flex
              fillWidth
              vertical="center"
              horizontal="center"
              paddingX="16"
              paddingY="64"
            >
              <Text variant="body-default-m" onBackground="neutral-weak">
                No results found
              </Text>
            </Flex>
          )}
        </Column>
      </Column>
    </Flex>,
    document.body
  );
};

// KbarTrigger component to open the Kbar
interface KbarTriggerProps {
  items: KbarItem[];
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

export const Kbar: React.FC<KbarTriggerProps> = ({ items, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Command+K (Mac) or Control+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        setIsOpen(prev => !prev); // Toggle Kbar open/close
      }
    };

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Flex onClick={handleOpen} {...rest}>{children}</Flex>
      <KbarContent items={items} isOpen={isOpen} onClose={handleClose} />
    </>
  );
};