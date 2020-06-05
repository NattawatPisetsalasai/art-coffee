# products
insert into products (name_th, name_en, description_th, description_en, price, updated_time, "sequence") values
('ข้าวแกงกะหรี่ทงคะสึ', 'curry rice fired pork', 'อร่อยมาก', 'delicious', 149, '2020-04-28 13:10:25', 1),
('ข้าวแกงกะหรี่ไข่เจียวฟูปู', 'curry rice omelet crab', 'อร่อยมาก', 'delicious', 159.50, '2020-04-28 13:10:25', 2),
('ข้าวแกงกะหรี่ไก่ย่าง', 'curry rice grilled chicken', 'อร่อยมาก', 'delicious', 200, '2020-04-28 13:10:25', 3),
('ข้าวแกงกะหรี่ปลาไหลย่าง', 'curry rice grilled Eel', 'อร่อยมาก', 'delicious', 200, '2020-04-28 13:10:25', 4),
('ข้าวแกงกะหรี่ปลาไข่เจียวแหนม', 'curry rice omelet sour pork', 'อร่อยมาก', 'delicious', 200, '2020-04-28 13:10:25', 5),
('ทะมะโกะด้ง', 'tamagodon', 'อร่อยมาก', 'delicious', 300.50, '2020-04-28 13:10:25', 11),
('บูตะด้ง', 'butadon', 'อร่อยมาก', 'delicious', 300.50, '2020-04-28 13:10:25', 12),
('อิคุระด้ง', 'ikuradon', 'อร่อยมาก', 'delicious', 300.50, '2020-04-28 13:10:25', 13),
('ชูกะด้ง', 'chukadon', 'อร่อยมาก', 'delicious', 300.50, '2020-04-28 13:10:25', 14),
('เท็นชิงด้ง', 'tenshindon', 'อร่อยมาก', 'delicious', 300.50, '2020-04-28 13:10:25', 15),
('ชาเขียว', 'Green Tea', 'อร่อยมาก', 'delicious', 25, '2020-04-28 13:10:25', 6),
('ชานม', 'Thai Tea', 'อร่อยมาก', 'delicious', 25, '2020-04-28 13:10:25', 7),
('เอสเพรสโซ', 'Espresso Hot', 'อร่อยมาก', 'delicious', 25, '2020-04-28 13:10:25', 8),
('เป๊ปซี่', 'Pepsi', 'อร่อยมาก', 'delicious', 25, '2020-04-28 13:10:25', 9),
('น้ำส้ม', 'Orange Juice', 'อร่อยมาก', 'delicious', 25, '2020-04-28 13:10:25', 10);

#categories
insert into "categories" (name_th, name_en, description_th, description_en) values
('ข้าวแกงกะหรี่', 'curry rice', 'น่าจะเป็นแกงกะหรี่อะแหละ', 'may be curry'),
('ดงบุริ', 'don buri', 'น่าจะเป็นอะไรสักอย่าง', 'may be something'),
('เครื่องดื่ม', 'drink', 'น่าจะเป็นเครื่องดื่ม', 'may be drink');

#product_category
insert into "product_category" (product_id, category_id) values
(1,1),(2,1),(3,1),(4,1),(5,1),(6,2),(7,2),(8,2),(9,2),(10,2),(11,3),(12,3),(13,3),(14,3),(15,3);

#options
insert into "options" (name_th, name_en, description_th, description_en) values
('ระดับความเผ็ด', 'Spicy level', 'ระดับความเผ็ดแบบต่างๆ', 'Spicy level'),
('เลือกเนื้อสัตว์เพิ่มเติม', 'Selected meat', 'เลือกเนื้อสัตว์ต่างๆ', 'Select meat for meal'),
('เลือกซอสต่างๆ', 'Selected sauce', 'เลือกซอสต่างๆ ใส่ไป', 'Select sauce for meal');

#option_menus
insert into "option_menus" (option_id, product_id) values
(1,1), (1,2), (1,3), (1,4), (1,5), 
(2,1), (2,2), (2,3), (2,4), (2,5), (2,6), (2,7), (2,8), (2,9), (2,10),
(3,6), (3,7), (3,8), (3,9), (3,10), (3,11), (3,12), (3,13), (3,14), (3,15);

#choice
insert into "choices" (name_th, name_en, price) values
('เผ็ดน้อย', 'low spicy', 0),('เผ็ดกลาง', 'medium spicy', 0),('เผ็ดมาก', 'high spicy', 0),
('หมู', 'pork', 10),('ไก่', 'chicken', 10),('กุ้ง', 'shrimp', 15),('ปลา', 'fish', 20),
('ซอสพริก','chili sauce', 5), ('ซอสมะเขือเทศ', 'tomato saurce', 5);

#option_choices
insert into "option_choices" (option_id, choice_id) values
(1,1), (1,2), (1,3), (2,4), (2,5), (2,6), (2,7), (3,8), (3,9);

#status
insert into "status" (name_customer_th, name_customer_en, name_restaurant_th, name_restaurant_en, description_th, description_en) values
('รอร้านค้ายืยยันออเดอร์', 'Wait', 'รายการใหม่', 'New', 'กรุณารอร้านค้ายืนยันออเดอร์สักครู่ค่ะ', 'Wait for order ok'),
('ชำระค่าอาหาร', 'Paid', 'ยังไม่ทำการชำระเงิน', 'No paid', 'กรุณาชำระค่าอาหารภายใน', 'Plesae paid in time'),
('รอยืนยันการชำระเงิน', 'Waited Paid', 'ทำการชำระเงินแล้ว', 'Paid', 'รอร้านค้ายืนยันการชำระเงินซักครู่', 'Wait for restaurant comfirm payment'),
('ร้านค้ากำลังจัดเตรียมอาหาร', 'Cooking', 'ออเดอร์ปัจจุบัน', 'Current Order', 'ร้านค้ากำลังจัดเตรียมอาหารของท่าน กรุณารออาหารประมาณ', 'Restaurant prepare your food plesae wait'),
('กำลังจัดส่ง', 'Delivery', 'กำลังจัดส่ง', 'Delivery', 'คนขับกำลังจัดส่งอาหารของคุณ กรุณารอประมาณ', 'Driver is delivery your food please wait'),
('จัดส่งเสร็จสิ้น', 'Complete', 'เสร็จสิ้น', 'Complete',  '', ''),
('ยกเลิกออเดอร์', 'Cancel order', 'ยกเลิกออเดอร์', 'Cancel order', '', ''),
('ไม่ได้ชำระเงิน', 'Not paid', 'ไม่ได้ชำระเงิน', 'Not paid', '', '');

#branch
insert into "branches" (username, "password", name_th, name_en, description_th, description_en, open_time, close_time, refresh_time, open_date, latitude, longitude ) values
('yellow_1', 'password', 'ไอแอมเยลโล่คาเฟ_1', 'im yellow_1', 'ร้านขายข้าวแกงกะหรี่แบบไทย', 'curry rice style thai', '09:00:00', '18:00:00', '22:00:00', 'M,T,W,TH,F', 13.123456, 45.123456),
('yellow_2', 'password', 'ไอแอมเยลโล่คาเฟ_2', 'im yellow_2', 'ร้านขายข้าวแกงกะหรี่แบบไทย', 'curry rice style thai', '09:00:00', '18:00:00', '22:00:00', 'M,T,W,TH,F', 50.123456, 90.123456),
('yellow_3', 'password', 'ไอแอมเยลโล่คาเฟ_3', 'im yellow_3', 'ร้านขายข้าวแกงกะหรี่แบบไทย', 'curry rice style thai', '09:00:00', '18:00:00', '22:00:00', 'M,T,W,TH,F', 132.123456, 145.123456);

#address
insert into "address" (customer_id, "name", address_line_1, province, district, city, postal_code) values
(1, 'บ้านหิว', '758/60 ซอย รัตนาธิเบศร์ 36 โครงการเซล รัตนาธิเบศร์2 ตึก A ชั้น7', 'รัตนาธิเบศร์', 'รัตนาธิเบศร์', 'นนทบุรี', '11000');



