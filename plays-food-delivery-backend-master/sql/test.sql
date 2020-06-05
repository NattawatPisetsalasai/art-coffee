insert into orders (order_code, order_name, is_active, effective_date_from, created_by) values ('ord0001', 'order 1', true, now(), 'pipe');
insert into orders (order_code, order_name, is_active, effective_date_from, created_by) values ('ord0002', 'order 2', true, now(), 'pipe');

-- should see a new record on orders_history table and ord0001 record of orders table is updated
update orders set order_name = 'order 1 new' where order_code = 'ord0001';

-- should see a new record on orders_history table and ord0002 record of orders table is updated
update orders set order_name = 'order 2 new' where order_code = 'ord0002';
