
CREATE SCHEMA Store;

-- profile
/*
first_name,last_name,date_of_birth,gender,favorite_color
*/

CREATE TABLE Store.profile(
id SERIAL PRIMARY KEY,
first_name VARCHAR(255),
last_name VARCHAR(255),
email  VARCHAR(255),
date_of_birth DATE,
gender VARCHAR(10),
favorite_color VARCHAR(100),
location VARCHAR(100)
);




ALTER TABLE Store.profile
DROP gender;



-- inventory
/*
name,price, quantity,
available_colors[list], description
category[list]
*/

CREATE TABLE Store.inventory(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
price NUMERIC(8,2),
quantity INT,
available_colors VARCHAR(25),
category VARCHAR(25),
gender VARCHAR(10)
)

ALTER TABLE Store.inventory
ADD gender VARCHAR(10);

-- cart
/*
profile_id, time_added_in_cart, time_purchased,
is_purchased, price
*/

CREATE TABLE Store.cart(
id SERIAL PRIMARY KEY,
profile_id INT,
time_added_to_cart DATE,
time_purchased DATE,
is_purchased BOOLEAN,
is_userCart BOOLEAN,
item_id INT,
price NUMERIC(8,2)
);


-- Get Data FROM Database
SELECT * FROM Store.profile;
SELECT * FROM Store.inventory;
SELECT * FROM Store.cart;


