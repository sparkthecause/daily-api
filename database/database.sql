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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: blurbs; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE blurbs (
    blurb_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "position" integer,
    edition_id uuid,
    approved_at timestamp without time zone,
    blurb_type text,
    data jsonb
);


--
-- Name: editions; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE editions (
    edition_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    publish_on date,
    subject text,
    approved_at timestamp without time zone,
    css_href text
);


--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE subscribers (
    email_address text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    unsubscribed_at timestamp without time zone,
    subscriber_id uuid DEFAULT uuid_generate_v4() NOT NULL
);


--
-- Data for Name: blurbs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY blurbs (blurb_id, "position", edition_id, approved_at, blurb_type, data) FROM stdin;
\.


--
-- Data for Name: editions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY editions (edition_id, publish_on, subject, approved_at, css_href) FROM stdin;
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY subscribers (email_address, created_at, unsubscribed_at, subscriber_id) FROM stdin;
\.


--
-- Name: blurbs_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_pkey PRIMARY KEY (blurb_id);


--
-- Name: editions_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY editions
    ADD CONSTRAINT editions_pkey PRIMARY KEY (edition_id);


--
-- Name: subscribers_email_address_key; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY subscribers
    ADD CONSTRAINT subscribers_email_address_key UNIQUE (email_address);


--
-- Name: subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (subscriber_id);


--
-- Name: blurbs_edition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_edition_id_fkey FOREIGN KEY (edition_id) REFERENCES editions(edition_id);


--
-- PostgreSQL database dump complete
--
