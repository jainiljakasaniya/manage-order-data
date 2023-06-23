CREATE TABLE IF NOT EXISTS "customer" (
    "customerID" SERIAL NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    CONSTRAINT "pk_customer" PRIMARY KEY ( "customerID" ),
    CONSTRAINT "uc_customer_email" UNIQUE ( "email" )
);
 
CREATE TABLE IF NOT EXISTS "customerAddresses" (
    "addressID" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" INT NOT NULL,
    "customerID" INT NOT NULL,
    CONSTRAINT "pk_customerAddresses" PRIMARY KEY ( "addressID" )
);

CREATE TABLE IF NOT EXISTS "order" (
    "orderID" SERIAL NOT NULL,
    "customerID" int NOT NULL,
    "orderDate" date NOT NULL,
    "priority" text NOT NULL CHECK("priority" IN ('high', 'medium', 'low')),
    CONSTRAINT "pk_order" PRIMARY KEY ( "orderID" )
);

CREATE TABLE IF NOT EXISTS "orderItems" (
    "orderItemID" SERIAL NOT NULL,
    "orderID" int NOT NULL,
    "productID" int NOT NULL,
    "quantity" int NOT NULL,
    CONSTRAINT "pk_orderItems" PRIMARY KEY ( "orderItemID" )
);

CREATE TABLE IF NOT EXISTS "product" (
    "productID" SERIAL NOT NULL,
    "productName" varchar(200) NOT NULL,
    CONSTRAINT "pk_product" PRIMARY KEY ( "productID" ),
    CONSTRAINT "uc_product_productName" UNIQUE ( "productName" )
);

ALTER TABLE IF EXISTS "customerAddresses" 
   ADD CONSTRAINT "fk_customerAddresses_customerId" FOREIGN KEY("customerID") REFERENCES "customer" ("customerID");

ALTER TABLE IF EXISTS "order" 
  ADD CONSTRAINT "fk_order_customerID" FOREIGN KEY("customerID")REFERENCES "customer" ("customerID");

ALTER TABLE IF EXISTS "orderItems" 
  ADD CONSTRAINT "fk_orderItems_orderID" FOREIGN KEY("orderID")REFERENCES "order" ("orderID") ON DELETE CASCADE;

ALTER TABLE IF EXISTS "orderItems" 
  ADD CONSTRAINT "fk_orderItems_productID" FOREIGN KEY("productID")REFERENCES "product" ("productID");

CREATE INDEX IF NOT EXISTS "idx_customer_name" ON "customer" ("name");

-- Insert data into customer table
INSERT INTO "customer" ("name", "email")
VALUES ('John', 'John@gmail.com');

-- Insert data into product table
INSERT INTO "product" ("productName")
VALUES ('Toy'), ('Basket'), ('Pen');

-- Insert data into order table
INSERT INTO "order" ("customerID", "orderDate", "priority")
VALUES (1, '2023-06-23', 'high');

-- Insert data into orderItems table
INSERT INTO "orderItems" ("orderID", "productID", "quantity")
VALUES (1, 1, 1);

-- Insert data into customerAddresses table
INSERT INTO "customerAddresses" ("street", "city", "state", "postalCode", "customerID")
VALUES ('123 Main St', 'Chennai', 'Tamilnadu', 600004, 1);