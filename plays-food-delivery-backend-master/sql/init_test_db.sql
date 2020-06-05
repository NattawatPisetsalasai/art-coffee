-- Database: test_db

-- DROP DATABASE test_db;

CREATE DATABASE test_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;


DROP TABLE IF EXISTS orders_history;
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
            order_id                serial          primary key,
            order_code              varchar(32)     not null,
            order_name              text     		not null,
            is_active               boolean         not null,
            effective_date_from     timestamp       not null,
            created_by		        text,
            unique(order_code)
);

CREATE TABLE orders_history (
	order_history_id        serial          primary key,
	order_id                integer         not null,
	order_code              varchar(32)     not null,
	order_name              text     		not null,
	is_active               boolean         not null,
	effective_date_from     timestamp       not null,
	effective_date_to       timestamp       not null,
	created_by       		text
);

CREATE OR REPLACE FUNCTION orders_trigger_to_insert_history()
RETURNS TRIGGER AS
$body$
BEGIN
    if new.order_code <> old.order_code or 
       new.order_name <> old.order_name or 
       new.is_active <> old.is_active then
        insert into orders_history (
            order_id,
            order_code,
            order_name,
            is_active,
            effective_date_from,
            effective_date_to,
            created_by
        )
        values (
            old.order_id,
            old.order_code,
            old.order_name,
            old.is_active,
            old.effective_date_from,
            now(),
            old.created_by     
        );
    end if;

    return new;
END;
$body$ language plpgsql;

CREATE TRIGGER orders_update 
	BEFORE UPDATE
    ON orders
    FOR EACH ROW
    EXECUTE PROCEDURE orders_trigger_to_insert_history();
