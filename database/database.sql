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
e417eb5b-3080-433c-8c26-38d620428189	2	346401bd-9957-4ee5-9bfc-f8f1b80cd767	2016-01-30 17:29:01.090327	title	{"text": "Well hello there!"}
bf93e88e-0f70-4f44-bcb9-590239378171	1	346401bd-9957-4ee5-9bfc-f8f1b80cd767	2016-01-30 00:00:00	text	{"text": "Text about pandas..."}
2ffbde71-ffb1-4935-a104-ec005bd5ea71	0	346401bd-9957-4ee5-9bfc-f8f1b80cd767	2016-04-30 19:39:59.360605	header	{"img_src": "https://cdn.sparkthecause.com/daily/images/email_header_white.png"}
65b5f800-e43c-47b9-bc21-d376c6fc583b	4	346401bd-9957-4ee5-9bfc-f8f1b80cd767	\N	unsubscribe	{"href": "https://daily.sparkthecause.com/unsubscribe?id={{subscriber_id}}"}
21b7d16c-abb6-4d2b-ad52-281ec3d9f947	3	346401bd-9957-4ee5-9bfc-f8f1b80cd767	2016-04-30 20:04:01.161657	share	{"text_img_src": "https://cdn.sparkthecause.com/daily/images/share_text.png", "email_img_src": "https://cdn.sparkthecause.com/daily/images/share_email.png"}
\.


--
-- Data for Name: editions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY editions (edition_id, publish_on, subject, approved_at, css_href) FROM stdin;
346401bd-9957-4ee5-9bfc-f8f1b80cd767	2016-08-13	My Second Edition!	2016-01-29 00:00:00	https://cdn.sparkthecause.com/daily/styles/style.css
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY subscribers (email_address, created_at, unsubscribed_at, subscriber_id) FROM stdin;
charles@sparkthecause.com	2016-01-30 17:25:58.657227	\N	12488c27-6729-4f2b-b5d0-998781ab7309
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

