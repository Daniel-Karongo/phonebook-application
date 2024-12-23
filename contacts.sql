-- create database phonebook;

use phonebook;
-- DROP table contacts;
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    contact_image TEXT, -- Base64-encoded image
    physical_address TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    favorite BOOLEAN DEFAULT FALSE
);

INSERT INTO contacts (first_name, last_name, email_address, phone_number, contact_image, physical_address, is_Deleted, favorite) VALUES
('John', 'Doe', 'john.doe1@example.com', '1234567890', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '123 Main St, Springfield', FALSE, TRUE),
('Jane', 'Smith', 'jane.smith2@example.com', '0987654321', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '456 Elm St, Rivertown', FALSE, TRUE),
('Michael', 'Johnson', 'michael.johnson3@example.com', '1112223333', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '789 Oak St, Lakeside', FALSE, TRUE),
('Emily', 'Brown', 'emily.brown4@example.com', '2223334444', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '321 Pine St, Greenville', FALSE, TRUE),
('Daniel', 'Williams', 'daniel.williams5@example.com', '3334445555', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '654 Cedar St, Hilltown', FALSE, TRUE),
('Sophia', 'Jones', 'sophia.jones6@example.com', '4445556666', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '987 Birch St, Woodvale', FALSE, FALSE),
('Chris', 'Taylor', 'chris.taylor7@example.com', '5556667777', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '135 Maple St, Meadowbrook', FALSE, FALSE),
('Sarah', 'Davis', 'sarah.davis8@example.com', '6667778888', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '246 Cherry St, Forestview', FALSE, FALSE),
('Matthew', 'Miller', 'matthew.miller9@example.com', '7778889999', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '357 Ash St, Riverbend', FALSE, FALSE),
('Olivia', 'Wilson', 'olivia.wilson10@example.com', '8889990000', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '468 Poplar St, Baytown', FALSE, FALSE),
('Joshua', 'Moore', 'joshua.moore11@example.com', '9990001111', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '579 Magnolia St, Parkside', FALSE, FALSE),
('Mia', 'Anderson', 'mia.anderson12@example.com', '0001112222', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '680 Walnut St, Creekview', FALSE, FALSE),
('David', 'Clark', 'david.clark13@example.com', '1112223334', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '791 Spruce St, Willowfield', FALSE, FALSE),
('Isabella', 'Thomas', 'isabella.thomas14@example.com', '2223334445', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '902 Cypress St, Bloomfield', FALSE, FALSE),
('James', 'Martinez', 'james.martinez15@example.com', '3334445556', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '101 Redwood St, Lakewood', FALSE, FALSE),
('Ella', 'Hernandez', 'ella.hernandez16@example.com', '4445556667', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '212 Alder St, Fairview', FALSE, FALSE),
('Andrew', 'Lopez', 'andrew.lopez17@example.com', '5556667778', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '323 Beech St, Brookside', FALSE, FALSE),
('Chloe', 'Gonzalez', 'chloe.gonzalez18@example.com', '6667778889', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '434 Aspen St, Harborview', FALSE, FALSE),
('Benjamin', 'Perez', 'benjamin.perez19@example.com', '7778889990', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '545 Hickory St, Highland', FALSE, FALSE),
('Ava', 'Turner', 'ava.turner20@example.com', '8889990001', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '656 Juniper St, Bridgewater', FALSE, FALSE),
('Liam', 'White', 'liam.white21@example.com', '9990001112', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '767 Cottonwood St, Riverview', FALSE, FALSE),
('Charlotte', 'Harris', 'charlotte.harris22@example.com', '0001112223', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '878 Sequoia St, Pinecrest', FALSE, FALSE),
('Ethan', 'Martin', 'ethan.martin23@example.com', '1112223335', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '989 Willow St, Sunnyside', FALSE, FALSE),
('Amelia', 'Thompson', 'amelia.thompson24@example.com', '2223334446', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '190 Cedarwood St, Valleyview', FALSE, FALSE),
('Alexander', 'Garcia', 'alexander.garcia25@example.com', '3334445557', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '301 Elder St, Pleasantville', FALSE, FALSE),
('Sofia', 'Martinez', 'sofia.martinez26@example.com', '4445556668', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '412 Pinecone St, Rockford', FALSE, FALSE),
('Lucas', 'Rodriguez', 'lucas.rodriguez27@example.com', '5556667779', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '523 Maplewood St, Greenhaven', FALSE, FALSE),
('Emma', 'Lewis', 'emma.lewis28@example.com', '6667778880', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '634 Elmwood St, Oakridge', FALSE, FALSE),
('Mason', 'Walker', 'mason.walker29@example.com', '7778889991', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '745 Chestnut St, Ridgefield', FALSE, FALSE),
('Grace', 'Hall', 'grace.hall30@example.com', '8889990002', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '856 Laurel St, Springdale', FALSE, FALSE),
('Oliver', 'Allen', 'oliver.allen31@example.com', '9990001113', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '967 Hawthorn St, Havenwood', FALSE, FALSE),
('Lily', 'Young', 'lily.young32@example.com', '0001112224', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '178 Pecan St, Fairhaven', FALSE, FALSE),
('Logan', 'King', 'logan.king33@example.com', '1112223336', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '289 Dogwood St, Oceanview', FALSE, FALSE),
('Zoe', 'Scott', 'zoe.scott34@example.com', '2223334447', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '390 Sycamore St, Clearview', FALSE, FALSE),
('Jackson', 'Green', 'jackson.green35@example.com', '3334445558', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '401 Acacia St, Hillcrest', FALSE, FALSE),
('Ella', 'Baker', 'ella.baker36@example.com', '4445556669', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '512 Redwood Ave, Meadowfield', FALSE, FALSE),
('Aiden', 'Adams', 'aiden.adams37@example.com', '5556667770', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '623 Elmwood Ave, Bayfield', FALSE, FALSE),
('Hannah', 'Nelson', 'hannah.nelson38@example.com', '6667778881', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '734 Birchwood Ave, Riverfield', FALSE, FALSE),
('Samuel', 'Carter', 'samuel.carter39@example.com', '7778889992', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '845 Pinewood Ave, Summitville', FALSE, FALSE),
('Aria', 'Mitchell', 'aria.mitchell40@example.com', '8889990003', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '956 Firwood Ave, Brookhaven', FALSE, FALSE),
('Joseph', 'Parker', 'joseph.parker41@example.com', '9990001114', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '167 Oakwood Ave, Crestwood', FALSE, FALSE),
('Victoria', 'Evans', 'victoria.evans42@example.com', '0001112225', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '278 Maplewood Ave, Hilltown', FALSE, FALSE),
('Elijah', 'Edwards', 'elijah.edwards43@example.com', '1112223337', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '389 Sprucewood Ave, Seabrook', FALSE, FALSE),
('Madison', 'Collins', 'madison.collins44@example.com', '2223334448', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '490 Cypresswood Ave, Bloomhill', FALSE, FALSE),
('Sebastian', 'Stewart', 'sebastian.stewart45@example.com', '3334445559', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '601 Ashwood Ave, Sunrise', FALSE, FALSE),
('Scarlett', 'Rogers', 'scarlett.rogers46@example.com', '4445556670', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '712 Cherrywood Ave, Brightview', FALSE, FALSE),
('Henry', 'Ward', 'henry.ward47@example.com', '5556667781', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '823 Beechwood Ave, Shadyside', FALSE, FALSE),
('Luna', 'Peterson', 'luna.peterson48@example.com', '6667778892', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '934 Hickorywood Ave, Shadowbrook', FALSE, FALSE),
('Levi', 'Gray', 'levi.gray49@example.com', '7778889003', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '145 Juniperwood Ave, Ridgepoint', FALSE, FALSE),
('Harper', 'Bell', 'harper.bell50@example.com', '8889990114', 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', '256 Cottonwoodwood Ave, Skylake', FALSE, FALSE);


select * from contacts;
select * from contacts where is_deleted = 1;
select * from contacts where favorite = 1;
update contacts set favorite = 1 where id in (1,2,3,4,5,6,7,8,9,10);
update contacts set favorite = 0;
-- update contacts set contact_image = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg";

update contacts set is_deleted = 0;