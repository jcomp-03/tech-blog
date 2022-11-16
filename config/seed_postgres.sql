-- DROP DATABASE IF EXISTS tech_blog_db;
-- CREATE DATABASE tech_blog_db;
-- USE tech_blog_db;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    user_id INTEGER,
    referred_article VARCHAR(1000),
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_BLOG_POST_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR(1000) NOT NULL,
    user_id INTEGER,
    post_id INTEGER,
    created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_COMMENT_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_COMMENT_post_id FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE SET NULL
);

INSERT INTO users (username, email, password)
VALUES
('anonymousJoe', 'joe@anonymous.com', '12345678'),
('full-time-blogger', 'full-time@blogging.com', '12345678'),
('TechAficionado', 'techaficionado@gmail.com', '12345678'),
('Dr. Seuss', 'catinthehat@guesswho.com', '12345678');

INSERT INTO blog_posts (title, content, user_id, referred_article)
VALUES
('Cogito, ergo sum',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non vulputate tortor. Aliquam porttitor ornare nisi, sit amet pharetra tortor ultrices sit amet. Donec varius non nisl ut mollis. Duis varius tincidunt lobortis. Nullam et interdum ex. Maecenas ac nunc vel augue ultrices commodo at et felis. Nullam accumsan ipsum id porttitor faucibus. Aenean at tincidunt nisl. Vestibulum nibh eros, ornare vel porttitor nec, varius finibus magna. Pellentesque purus ligula, condimentum eget mattis nec, vulputate sed lacus. Aliquam vitae pulvinar nulla, non accumsan metus. Ut maximus erat posuere dolor convallis facilisis. Aenean dignissim sem eu ipsum dapibus, at consequat leo iaculis. Nulla id consequat nisl. Maecenas sed mi condimentum, dictum dolor quis, ornare nulla. Aliquam tincidunt leo vitae nisl sodales feugiat.',
3,
'https://www.coindesk.com/markets/2022/09/26/first-mover-americas-bitcoin-up-slightly-after-hitting-weekend-lows-on-recession-fears/'
),
('In vino veritas',
'Cras a ligula tincidunt, accumsan elit nec, congue nunc. Sed congue lacus et faucibus scelerisque. Quisque scelerisque hendrerit consectetur. Duis id finibus lacus. In laoreet risus sed pretium vulputate. Curabitur porttitor velit sit amet nibh elementum pellentesque. Cras ipsum tellus, vestibulum ac risus ut, lobortis viverra purus. In hendrerit lectus a ex aliquet ultrices. Integer porta lectus ut porta ultrices. Duis auctor ante eget nisl hendrerit congue. Curabitur rutrum eget nisi eget pulvinar. Curabitur ac mi neque.',
1,
'https://www.coindesk.com/tech/2022/09/26/filesharing-crypto-project-filecoin-reports-strong-fundamental-growth-ahead-of-fvm-launch/'
),
('Alea iacta est',
'Phasellus accumsan id diam a elementum. Donec metus est, pretium sit amet nibh ac, interdum posuere risus. Donec quis quam libero. Sed sed dignissim sem. Etiam dapibus sapien eu eros faucibus finibus. Suspendisse magna quam, vehicula vel cursus id, tempus nec nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at laoreet justo, lobortis sagittis enim. In hac habitasse platea dictumst. Nulla vel dolor vel tortor rutrum accumsan. Donec sollicitudin tincidunt libero. Nulla euismod mauris ac pharetra maximus.',
4,
'https://www.coindesk.com/policy/2022/09/26/cftcs-ooki-dao-action-shatters-illusion-of-regulator-proof-protocol/'
),
('Veni, vidi, vici',
'Proin sodales ex vitae lacus sodales congue. Integer a convallis eros. Cras justo sem, blandit et magna non, commodo dignissim lacus. Cras sed mi sed mauris vestibulum eleifend a a erat. Donec cursus cursus faucibus. Praesent ut ex vel mi ullamcorper varius vitae ut odio. Curabitur a neque ullamcorper, viverra metus non, ultrices erat. Nam viverra odio orci, at ullamcorper dolor gravida eget. Pellentesque pharetra mattis tellus id condimentum. Integer venenatis sed sapien efficitur commodo. Nulla facilisi. Aliquam erat volutpat. Cras vitae imperdiet ante, at pretium velit. Nulla eleifend, felis ut lobortis luctus, libero leo tincidunt tortor, non commodo nisl nibh eget massa. Nam et erat eu arcu blandit hendrerit quis vitae velit.',
2,
'https://www.coindesk.com/layer2/2022/09/26/does-the-us-government-have-a-monopoly-on-trust/'
),
('Acta, non verba',
'Nunc vel lacinia dui. Morbi ligula diam, tincidunt eu dolor tempor, elementum convallis diam. Pellentesque semper purus vitae congue malesuada. Mauris et elit vestibulum, finibus massa ut, fringilla sapien. Duis a justo porta, aliquet ipsum nec, consectetur dui. Integer nec orci et lacus pharetra mattis. Sed vel purus eget turpis sollicitudin mattis. Morbi venenatis diam leo, sit amet gravida felis vehicula sit amet.',
1,
'https://www.coindesk.com/layer2/2022/09/24/urbit-is-web3-weird-and-wonderful-and-i-dont-care-who-made-it/'
);

INSERT INTO comments (comment_text, user_id, post_id)
VALUES
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 3, 2),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 1, 2),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 4, 1),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 2, 1),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 3, 4),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 1, 4),
('Ut mollis accumsan libero, vitae ullamcorper metus viverra id.', 2, 5);


