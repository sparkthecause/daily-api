--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

--
-- Name: blurb_types; Type: TABLE; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

CREATE TABLE blurb_types (
    blurb_type_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name text
);

--
-- Name: blurbs; Type: TABLE; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

CREATE TABLE blurbs (
    blurb_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    priority integer,
    edition_id uuid,
    approved_at timestamp without time zone,
    title text,
    description text,
    blurb_type_id uuid
);

--
-- Name: editions; Type: TABLE; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

CREATE TABLE editions (
    edition_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    publish_on timestamp without time zone,
    subject text,
    approved_at timestamp without time zone
);

--
-- Name: images; Type: TABLE; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

CREATE TABLE images (
    image_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    extension text NOT NULL,
    position int DEFAULT 1::int NOT NULL,
    href text,
    blurb_id uuid
);

--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

CREATE TABLE subscribers (
    email_address text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    unsubscribed_at timestamp without time zone,
    subscriber_id uuid DEFAULT uuid_generate_v4() NOT NULL
);

--
-- Name: blurb_types_pkey; Type: CONSTRAINT; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

ALTER TABLE ONLY blurb_types
    ADD CONSTRAINT blurb_types_pkey PRIMARY KEY (blurb_type_id);


--
-- Name: blurbs_pkey; Type: CONSTRAINT; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_pkey PRIMARY KEY (blurb_id);


--
-- Name: editions_pkey; Type: CONSTRAINT; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

ALTER TABLE ONLY editions
    ADD CONSTRAINT editions_pkey PRIMARY KEY (edition_id);


--
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: qbrzdicahojezm; Tablespace:
--

ALTER TABLE ONLY subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (subscriber_id);


--
-- Name: blurbs_blurb_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qbrzdicahojezm
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_blurb_type_id_fkey FOREIGN KEY (blurb_type_id) REFERENCES blurb_types(blurb_type_id);


--
-- Name: blurbs_edition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qbrzdicahojezm
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_edition_id_fkey FOREIGN KEY (edition_id) REFERENCES editions(edition_id);


--
-- Name: images_blurb_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qbrzdicahojezm
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_blurb_id_fkey FOREIGN KEY (blurb_id) REFERENCES blurbs(blurb_id);
