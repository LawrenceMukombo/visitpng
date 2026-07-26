CREATE TABLE `trips` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`user_id` integer NOT NULL,`name` text NOT NULL,`destination` text NOT NULL,`start_date` text NOT NULL,`end_date` text NOT NULL,`traveller_count` integer DEFAULT 1 NOT NULL,`budget` integer DEFAULT 0 NOT NULL,`interests` text,`notes` text,`share_code` text,`status` text DEFAULT 'planning' NOT NULL,`created_at` text NOT NULL,`updated_at` text NOT NULL,FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade);
--> statement-breakpoint
CREATE UNIQUE INDEX `trips_share_code_unique` ON `trips` (`share_code`);
--> statement-breakpoint
CREATE INDEX `trips_user_idx` ON `trips` (`user_id`);
--> statement-breakpoint
CREATE TABLE `trip_collaborators` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`trip_id` integer NOT NULL,`email` text NOT NULL,`role` text DEFAULT 'view' NOT NULL,`status` text DEFAULT 'invited' NOT NULL,`created_at` text NOT NULL,FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade);
--> statement-breakpoint
CREATE UNIQUE INDEX `trip_collaborators_unique` ON `trip_collaborators` (`trip_id`,`email`);
--> statement-breakpoint
CREATE TABLE `itinerary_items` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`trip_id` integer NOT NULL,`listing_id` integer,`title` text NOT NULL,`item_type` text DEFAULT 'activity' NOT NULL,`scheduled_date` text NOT NULL,`start_time` text,`end_time` text,`cost` integer DEFAULT 0 NOT NULL,`booking_reference` text,`notes` text,`position` integer DEFAULT 0 NOT NULL,`created_at` text NOT NULL,`updated_at` text NOT NULL,FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade,FOREIGN KEY (`listing_id`) REFERENCES `listings`(`id`) ON UPDATE no action ON DELETE set null);
--> statement-breakpoint
CREATE INDEX `itinerary_trip_date_idx` ON `itinerary_items` (`trip_id`,`scheduled_date`,`position`);