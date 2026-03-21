create TABLE Owner(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK(username != '' AND  email != '' AND password_hash !='')
);

create TABLE Task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMP NOT NULL,
    priority BOOLEAN DEFAULT FALSE,
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Owner (id) ON DELETE CASCADE
);
