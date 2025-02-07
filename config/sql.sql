CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE, -- ✅ Track which user rated the movie
  value NUMERIC(2,1) CHECK (value >= 0 AND value <= 10), -- ✅ Allow 0.0 - 10.0 scale
  UNIQUE (movie_id, user_id) -- ✅ Prevent users from rating the same movie multiple times
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL, -- (This should be hashed in Node.js)
  role VARCHAR(20) DEFAULT 'regular' CHECK (role IN ('regular', 'admin', 'creator')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  mongolian_title VARCHAR(255), -- ✅ Mongolian translation of the title
  year SMALLINT CHECK (year >= 1800 AND year <= 2100), -- ✅ Change VARCHAR to SMALLINT
  rated VARCHAR(10),
  released DATE,
  runtime INTERVAL, -- ✅ Convert runtime into INTERVAL (e.g., '2 hours 22 minutes')
  genre VARCHAR(50) CHECK (genre IN ('Action','Animation', 'Comedy','Crime','Drama','Experimental','Fantasy','Historical','Horror','Romance','Science Fiction','Thriller','Western','Musical','War','Other')), 
  director VARCHAR(255),
  writer TEXT,
  actors TEXT,
  plot TEXT,
  mongolian_plot TEXT, -- ✅ Mongolian translation of the plot
  language VARCHAR(100),
  country VARCHAR(100),
  awards TEXT,
  mongolian_awards TEXT, -- ✅ Mongolian translation of awards
  poster TEXT,
  imdb_rating NUMERIC(3,1), -- ✅ Storing rating as decimal (e.g., 9.3)
  imdbID VARCHAR(20) UNIQUE,
  type VARCHAR(50),
  box_office MONEY -- ✅ Store as MONEY for proper currency handling
);

