create table "customers" (
  "customer_id" serial8 not null unique,
  "username" varchar(16) unique,
  "password" varchar(100),
  "firstname" varchar(50) not null,
  "lastname" varchar(50) not null,
  "phone" varchar(20),
  "email" varchar(50) unique,
  "facebook_id" varchar(40) unique,
  "google_id" varchar(40) unique,
  "point" float8 default 0,
  "default_billing_addr" int8 unique,
  "default_shipping" int8 unique,
  "is_deleted" bool not null default false,
  "google_pic" text,
  "facebook_pic" text,
  primary key ("customer_id"),
  foreign key ("default_billing_addr") references "address"("address_id") on delete cascade,
  foreign key ("default_shipping") references "address"("address_id") on delete cascade
);

create table "default_billing_addr" (
  "customer_id" int8 not null unique,
  "address_id" int8 not null unique,
  primary key ("customer_id", "address_id"),
  foreign key ("customer_id") references "customer"("customer_id") on delete cascade,
  foreign key ("address_id") references "address"("address_id") on delete cascade
);

create table "default_shipping_addr" (
  "customer_id" int8 not null unique,
  "address_id" int8 not null unique,
  primary key ("customer_id", "address_id"),
  foreign key ("customer_id") references "customer"("customer_id") on delete cascade,
  foreign key ("address_id") references "address"("address_id") on delete cascade
);

create table "address" (
  "address_id" serial8 not null unique,
  "customer_id" int8 unique,
  "name" varchar(100) not null,
  "address_line" varchar(100) not null,
  "province" varchar(20) not null,
  "district" varchar(20) not null,
  "city" varchar(100) not null,
  "postal_code" varchar(5) not null,
  "latitude" numeric(10,6),
  "longitude" numeric(10,6),
  "comment" text,
  primary key ("address_id")
);

create table "coupons" (
  "coupon_id" serial8 not null unique,
  "name" varchar(100) not null,
  "description" text,
  "coupon_code" varchar(20) not null,
  "expiry_date" timestamp not null,
  "coupon_type" int8 not null,
  "amount" int8 not null,
  "min_amount" int8 not null,
  "max_amount" int8 not null,
  "category_id" int8 not null,
  primary key ("coupon_id"),
  foreign key ("category_id") references "category"("category_id") on delete cascade
);

create table "favorite_products" (
  "customer_id" int8 not null,
  "product_id" int8 not null,
  primary key ("customer_id", "product_id"),
  foreign key ("customer_id") references "customers"("customer_id") on delete cascade,
  foreign key ("product_id") references "products"("products") on delete cascade
);

create table "orders" (
  "order_id" serial8 not null unique,
  "customer_id" int8 not null,
  "payment_id" int8 unique,
  "billing_address_id" int8,
  "shipping_address_id" int8,
  "branch_id" int8 not null,
  "is_pickup" bool not null default false,
  "pickup_appoint_time" timestamp,
  "pickup_time" timestamp,
  "create_time" timestamp,
  "printed_time" timestamp,
  "total_price" numeric(8,2) default 0,
  primary key ("order_id"),
  foreign key ("customer_id") references "customers"("customer_id") on delete cascade,
  foreign key ("payment_id") references "payment_methods"("payment_id") on delete cascade,
  foreign key ("billing_address_id") references "address"("address_id") on delete cascade,
  foreign key ("shipping_address_id") references "address"("address_id") on delete cascade,
  foreign key ("branch_id") references "branches"("branch_id") on delete cascade
);

create table "payment_methods" (
  "payment_id" serial8 not null unique,
  "name" varchar(50) not null,
  "description" text,
  primary key ("payment_id")
);

create table "drivers" (
  "driver_id" serial8 not null unique,
  "username" varchar(16) not null,
  "password" varchar(100) not null,
  "firstname" varchar(50),
  "lastname" varchar(50),
  "phone" varchar(20) not null,
  "note" text,
  "is_deleted" bool default false,
  "is_temp" bool default false,
  primary key ("driver_id")
);

create table "branches" (
  "branch_id" serial8 not null unique,
  "username" varchar(16) not null,
  "password" varchar(100) not null,
  "name_th" varchar(50) not null,
  "name_en" varchar(50) not null,
  "description_th" text,
  "description_en" text,
  "open_time" time not null,
  "close_time" time not null,
  "refresh_time" time not null,
  "open_date" varchar(30) not null,
  "latitude" numeric(10,6) not null,
  "longitude" numeric(10,6) not null,
  "is_deleted" bool not null default false,
  "phone" varchar(20) not null,
  "pin" varchar(4) not null,
  primary key ("branch_id")
);

create table "group_orders" (
  "group_order_id" serial8 not null unique,
  "driver_id" int8 not null,
  "order_id" int8 not null,
  primary key ("group_order_id"),
  foreign key ("driver_id") references "drivers"("driver_id") on delete cascade,
  foreign key ("order_id") references "orders"("order_id") on delete cascade
);

create table "products" (
  "product_id" serial8 not null unique,
  "name_th" varchar(100) not null,
  "name_en" varchar(100) not null,
  "description_th" text,
  "description_en" text,
  "price" numeric(8,2) not null,
  "updated_time" timestamp not null,
  "is_enabled" bool default true,
  "is_deleted" bool default false,
  "is_recommended" bool default false,
  "sequence" int4 default 0,
  primary key ("product_id")
);

create table "order_items" (
  "item_id" serial8 not null unique,
  "order_id" int8 not null,
  "product_id" int8 not null,
  "comment" text,
  "amount" int4 not null,
  primary key ("item_id"),
  foreign key ("order_id") references "orders"("order_id") on delete cascade,
  foreign key ("product_id") references "products"("product_id") on delete cascade
);

create table "promotion_items" (
  "item_id" serial8 not null unique,
  "order_id" int8 not null,
  "promotion_id" int8 not null,
  "quantity" int4 not null,
  primary key ("item_id"),
  foreign key ("order_id") references "orders"("order_id") on delete cascade,
  foreign key ("promotion_id") references "promotions"("promotion_id") on delete cascade
);

create table "order_status_histories" (
  "history_id" serial8 not null unique,
  "order_id" int8 not null,
  "status_id" int8 not null,
  "datetime" timestamp not null,
  primary key ("history_id"),
  foreign key ("order_id") references "orders"("order_id") on delete cascade,
  foreign key ("status_id") references "status"("status_id") on delete cascade
);

create table "status" (
  "status_id" serial8 not null unique,
  "name_customer_th" varchar(50) not null unique,
  "name_customer_en" varchar(50) not null unique,
  "name_restuarant_th" varchar(50) not null unique,
  "name_restuarant_en" varchar(50) not null unique,
  "description_th" text unique,
  "description_en" text unique
);

create table "branch_products" (
  "branch_id" int8 not null,
  "product_id" int8 not null,
  "is_enable" bool default true,
  primary key ("branch_id", "product_id"),
  foreign key ("branch_id") references "branchs"("branch_id") on delete cascade,
  foreign key ("product_id") references "products"("product_id") on delete cascade
);

create table "order_item_choice" (
  "item_id" int8 not null,
  "option_id" int8 not null,
  "choice_id" int8 not null,
  primary key ("item_id", "option_id", "choice_id"),
  foreign key ("item_id") references "order_items"("item_id") on delete cascade,
  foreign key ("option_id") references "options"("option_id") on delete cascade,
  foreign key ("choice_id") references "choices"("choice_id") on delete cascade
);

create table "option_menus" (
  "option_id" int8 not null,
  "product_id" int8 not null,
  primary key ("option_id", "product_id"),
  foreign key ("option_id") references "options"("option_id") on delete cascade,
  foreign key ("product_id") references "products"("product_id") on delete cascade
);

create table "options" (
  "option_id" serial not null unique,
  "name_th" varchar(50) not null,
  "name_en" varchar(50) not null,
  "description_th" text,
  "description_en" text,
  "is_required" bool default true,
  "is_deleted" bool default false,
  primary key ("option_id")
);

create table "option_choices" (
  "option_id" int not null,
  "choice_id" int not null,
  primary key ("option_id", "choice_id"),
  foreign key ("option_id") references "options"("option_id") on delete cascade,
  foreign key ("choice_id") references "choices"("choice_id") on delete cascade
);

create table "choices" (
  "choice_id" serial not null unique,
  "name_th" varchar(100) not null,
  "name_en" varchar(100) not null,
  "price" numeric(8,2) not null,
  "is_deleted" bool not null default false,
  primary key ("choice_id")
);

create table "product_category" (
  "product_id" int8 not null,
  "category_id" int8 not null,
  primary key ("product_id", "category_id"),
  foreign key ("product_id") references "products"("product_id") on delete cascade,
  foreign key ("category_id") references "categories"("category_id") on delete cascade
);

create table "categories" (
  "category_id" serial8 not null unique,
  "name_th" varchar(100) not null,
  "name_en" varchar(100) not null,
  "description_th" text,
  "description_en" text,
  primary key ("category_id")
);

create table "promotions" (
  "promotion_id" serial8 not null unique,
  "name" varchar(100) not null,
  "description" text,
  "price" float not null,
  primary key ("promotion_id")
);

create table "promotion_products" (
  "promotion_id" int8 not null,
  "product_id" int8 not null,
  primary key ("promotion_id", "product_id"),
  foreign key ("promotion_id") references "promotions"("promotion_id") on delete cascade,
  foreign key ("product_id") references "products"("product_id") on delete cascade
);

create table "config" (
  "config_id" serial8 not null unique,
  "key" varchar(50) not null,
  "value" varchar(200) not null,
  "category" varchar(30) not null,
  primary key ("config_id")
);

