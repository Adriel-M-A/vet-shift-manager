ALTER TABLE pets ADD COLUMN gender TEXT CHECK(gender IN ('male', 'female')) DEFAULT NULL;
