-- Create the course table
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    url TEXT,
    estimated_content_length INTEGER,
    num_lectures INTEGER,
    num_videos INTEGER,
    promo_video_url_720 TEXT,
    promo_video_url_480 TEXT,
    promo_video_url_360 TEXT,
    promo_video_url_144 TEXT,
    instructors TEXT,
    requirements TEXT,
    images_size_48x27 TEXT,
    images_size_50x50 TEXT,
    images_size_75x75 TEXT,
    images_size_96x54 TEXT,
    images_size_100x100 TEXT,
    images_size_125_H TEXT,
    images_size_200_H TEXT,
    images_size_240x135 TEXT,
    images_size_304x171 TEXT,
    images_size_480x270 TEXT,
    images_size_750x422 TEXT,
    mobile_native_deeplink TEXT,
    last_update_date TEXT,
    xapi_activity_id TEXT,
    is_custom INTEGER,
    is_imported INTEGER,
    headline TEXT,
    level TEXT
);

-- Create the categories table (assuming you want to store only one category)
CREATE TABLE IF NOT EXISTS categories (
    course_id INTEGER,
    category TEXT,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the topics table (assuming you want to store only one topic)
CREATE TABLE IF NOT EXISTS topics (
    course_id INTEGER,
    topic_id INTEGER,
    topic_title TEXT,
    topic_url TEXT,
    PRIMARY KEY (course_id, topic_id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the caption_languages table (assuming you want to store multiple languages)
CREATE TABLE IF NOT EXISTS caption_languages (
    course_id INTEGER,
    caption_locale TEXT,
    caption_title TEXT,
    caption_english_title TEXT,
    PRIMARY KEY (course_id, caption_locale),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the what_you_will_learn table (assuming you want to store multiple learning points)
CREATE TABLE IF NOT EXISTS what_you_will_learn (
    course_id INTEGER,
    learn_point TEXT,
    PRIMARY KEY (course_id, learn_point),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the primary_category table (assuming you want to store only one primary category)
CREATE TABLE IF NOT EXISTS primary_category (
    course_id INTEGER,
    primary_category_id INTEGER,
    primary_category_title TEXT,
    primary_category_url TEXT,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the primary_subcategory table (assuming you want to store only one primary subcategory)
CREATE TABLE IF NOT EXISTS primary_subcategory (
    course_id INTEGER,
    primary_subcategory_id INTEGER,
    primary_subcategory_title TEXT,
    primary_subcategory_url TEXT,
    PRIMARY KEY (course_id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the topics table (assuming you want to store only one topic)
CREATE TABLE IF NOT EXISTS topics (
    course_id INTEGER,
    topic_id INTEGER,
    topic_title TEXT,
    topic_url TEXT,
    PRIMARY KEY (course_id, topic_id),
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- Create the fetch_logs table
CREATE TABLE IF NOT EXISTS fetch_courses_logs (
    id INTEGER PRIMARY KEY,
    date TEXT,
    num_courses INTEGER
);

-- Create the fetch logs per course table
CREATE TABLE IF NOT EXISTS fetch_course_log (
    course_id INTEGER PRIMARY KEY,
    fetch_courses_log_id INTEGER,
    FOREIGN KEY (fetch_courses_log_id) REFERENCES fetch_courses_logs (id)
);
