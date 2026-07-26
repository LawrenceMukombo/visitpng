CREATE TABLE `membership_plans` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`code` text NOT NULL,`name` text NOT NULL,`audience` text NOT NULL,`billing_period` text NOT NULL,`price` integer NOT NULL,`currency` text DEFAULT 'PGK' NOT NULL,`description` text NOT NULL,`is_complimentary` integer DEFAULT 0 NOT NULL,`is_active` integer DEFAULT 1 NOT NULL,`is_test_data` integer DEFAULT 1 NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `membership_plans_code_unique` ON `membership_plans` (`code`);
--> statement-breakpoint
CREATE TABLE `membership_benefits` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`code` text NOT NULL,`name` text NOT NULL,`description` text NOT NULL,`usage_limit` integer,`validation_type` text DEFAULT 'member_number' NOT NULL,`is_active` integer DEFAULT 1 NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `membership_benefits_code_unique` ON `membership_benefits` (`code`);
--> statement-breakpoint
CREATE TABLE `plan_benefits` (`plan_id` integer NOT NULL,`benefit_id` integer NOT NULL,PRIMARY KEY(`plan_id`,`benefit_id`),FOREIGN KEY (`plan_id`) REFERENCES `membership_plans`(`id`) ON UPDATE no action ON DELETE cascade,FOREIGN KEY (`benefit_id`) REFERENCES `membership_benefits`(`id`) ON UPDATE no action ON DELETE cascade);
--> statement-breakpoint
CREATE TABLE `membership_subscriptions` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`user_id` integer NOT NULL,`plan_id` integer NOT NULL,`member_number` text NOT NULL,`status` text NOT NULL,`start_date` text NOT NULL,`expiry_date` text,`auto_renew` integer DEFAULT 0 NOT NULL,`cancel_at_period_end` integer DEFAULT 0 NOT NULL,`created_at` text NOT NULL,`updated_at` text NOT NULL,FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,FOREIGN KEY (`plan_id`) REFERENCES `membership_plans`(`id`) ON UPDATE no action ON DELETE no action);
--> statement-breakpoint
CREATE UNIQUE INDEX `membership_subscriptions_member_number_unique` ON `membership_subscriptions` (`member_number`);
--> statement-breakpoint
CREATE UNIQUE INDEX `membership_user_current_idx` ON `membership_subscriptions` (`user_id`) WHERE status IN ('trial','active','payment_due','grace_period','complimentary');
--> statement-breakpoint
CREATE TABLE `benefit_redemptions` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`subscription_id` integer NOT NULL,`benefit_id` integer NOT NULL,`token` text NOT NULL,`status` text DEFAULT 'issued' NOT NULL,`redeemed_at` text,`created_at` text NOT NULL,FOREIGN KEY (`subscription_id`) REFERENCES `membership_subscriptions`(`id`) ON UPDATE no action ON DELETE no action,FOREIGN KEY (`benefit_id`) REFERENCES `membership_benefits`(`id`) ON UPDATE no action ON DELETE no action);
--> statement-breakpoint
CREATE UNIQUE INDEX `benefit_redemptions_token_unique` ON `benefit_redemptions` (`token`);
--> statement-breakpoint
CREATE TABLE `loyalty_ledger` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,`user_id` integer NOT NULL,`points` integer NOT NULL,`reason` text NOT NULL,`reference_type` text,`reference_id` text,`created_at` text NOT NULL,FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action);
--> statement-breakpoint
CREATE INDEX `loyalty_user_idx` ON `loyalty_ledger` (`user_id`,`created_at`);