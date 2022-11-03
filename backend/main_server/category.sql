USE hello_gifty;

insert into large_category (id, name) values (0, '카페');
insert into large_category (id, name) values (1, '편의점');
insert into large_category (id, name) values (2, '베이커리');
insert into large_category (id, name) values (3, '아이스크림');
insert into large_category (id, name) values (4, '외식/프렌차이즈');
insert into large_category (id, name) values (5, '상품권');

insert into small_category (name, large_category_id) values ('스타벅스', 0);
insert into small_category (name, large_category_id) values ('투썸플레이스', 0);
insert into small_category (name, large_category_id) values ('CU', 1);
insert into small_category (name, large_category_id) values ('GS25', 1);
insert into small_category (name, large_category_id) values ('파리바게트', 2);
insert into small_category (name, large_category_id) values ('뚜레쥬르', 2);
insert into small_category (name, large_category_id) values ('배스킨라빈스', 3);
insert into small_category (name, large_category_id) values ('설빙', 3);
insert into small_category (name, large_category_id) values ('BHC', 4);
insert into small_category (name, large_category_id) values ('도미노피자', 4);
insert into small_category (name, large_category_id) values ('해피콘', 5);
insert into small_category (name, large_category_id) values ('CGV', 5);