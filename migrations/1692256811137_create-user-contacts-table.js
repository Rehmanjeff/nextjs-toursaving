/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
   pgm.sql(`
      CREATE TABLE user_contacts (
         id SERIAL PRIMARY KEY,
         full_name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         description TEXT,
         created_at TIMESTAMPTZ DEFAULT current_timestamp,
         updated_at TIMESTAMPTZ DEFAULT current_timestamp,
         search TEXT
      );
   `);
};

exports.down = pgm => {
   pgm.sql('DROP TABLE users;');
};
