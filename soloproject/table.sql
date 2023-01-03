CREATE TABLE user_information (
	user_id	varchar(20)	primary key check(regexp_like(user_id, '^[a-z0-9]{5,20}$')),
	user_pw varchar2(200) not null,
	user_name varchar2(21) not null check(regexp_like(user_name, '^[가-힣]{2,7}$')),
	user_birth	date	not null,
	user_gender char(6) not null check(user_gender in ('남자','여자')),
	user_email	varchar2(30) not null check(regexp_like(user_email,'^\D\w@\D\w.(org|net|com)$')),
	user_tel char(11) not null check(regexp_like(user_tel, '^010[0-9]{8}$')),
	user_blurb	varchar2(3) default 'off' not null,
    user_rank varchar2(9) default '일반' not null check(user_rank in ('브론즈', '실버', '골드', '관리자')),
	user_start_date date default sysdate not null
);