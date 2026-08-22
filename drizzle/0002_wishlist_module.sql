CREATE TABLE `wishlists` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`user_id` integer NOT NULL,`name` text NOT NULL,`privacy` text DEFAULT 'private' NOT NULL,`share_code` text,`created_at` text NOT NULL,`updated_at` text NOT NULL,FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade);
--> statement-breakpoint
CREATE UNIQUE INDEX `wishlists_share_code_unique` ON `wishlists` (`share_code`);
--> statement-breakpoint
CREATE INDEX `wishlists_user_idx` ON `wishlists` (`user_id`);
--> statement-breakpoint
CREATE TABLE `wishlist_items` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`wishlist_id` integer NOT NULL,`listing_id` integer NOT NULL,`note` text,`created_at` text NOT NULL,`updated_at` text NOT NULL,FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists`(`id`) ON UPDATE no action ON DELETE cascade,FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON UPDATE no action ON DELETE cascade);
--> statement-breakpoint
CREATE UNIQUE INDEX `wishlist_items_unique` ON `wishlist_items` (`wishlist_id`,`listing_id`);
--> statement-breakpoint
CREATE INDEX `wishlist_items_list_idx` ON `wishlist_items` (`wishlist_id`);