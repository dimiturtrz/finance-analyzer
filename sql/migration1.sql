use FinanceAnalyzer;
alter table users drop password_hash;
alter table users drop password_salt;
alter table users drop admin;
alter table users add password varchar(100);