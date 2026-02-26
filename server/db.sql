create TABLE Task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    deadline VARCHAR(255),
    priority VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Owner (id)
);

create TABLE Owner(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255)
);