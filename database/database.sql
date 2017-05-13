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
-- Name: bounceTypes; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE "bounceTypes" (
    "bounceTypeId" integer NOT NULL,
    name text,
    description text,
    "retryAfterNSeconds" integer
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
-- Name: messages; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE messages (
    "editionId" uuid NOT NULL,
    "subscriberId" uuid NOT NULL,
    "deliveredAt" timestamp without time zone,
    "messageId" uuid NOT NULL,
    "bouncedAt" timestamp without time zone,
    "bounceTypeId" integer
);


--
-- Name: opens; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE opens (
    "openId" uuid DEFAULT uuid_generate_v4() NOT NULL,
    "messageId" uuid,
    ip inet,
    "secondsRead" integer,
    "openedAt" timestamp without time zone,
    zip text,
    city text,
    region text,
    "regionISOCode" text,
    country text,
    "countryISOCode" text,
    useragent text,
    platform text,
    "clientFamily" text,
    "clientCompany" text,
    "clientName" text,
    "osFamily" text,
    "osCompany" text,
    "osName" text,
    coords text
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
-- Name: users; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE users (
    "userId" uuid DEFAULT uuid_generate_v4() NOT NULL,
    username text,
    password text,
    "firstName" text,
    "lastName" text,
    "hasAccess" boolean DEFAULT true
);


--
-- Name: blurbs_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_pkey PRIMARY KEY (blurb_id);


--
-- Name: bounceTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY "bounceTypes"
    ADD CONSTRAINT "bounceTypes_pkey" PRIMARY KEY ("bounceTypeId");


--
-- Name: editions_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY editions
    ADD CONSTRAINT editions_pkey PRIMARY KEY (edition_id);


--
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY ("messageId");


--
-- Name: opens_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY opens
    ADD CONSTRAINT opens_pkey PRIMARY KEY ("openId");


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
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: users_username_key; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: blurbs_edition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY blurbs
    ADD CONSTRAINT blurbs_edition_id_fkey FOREIGN KEY (edition_id) REFERENCES editions(edition_id);


--
-- Name: editions_subscribers_edition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT editions_subscribers_edition_id_fkey FOREIGN KEY ("editionId") REFERENCES editions(edition_id);


--
-- Name: editions_subscribers_subscriber_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT editions_subscribers_subscriber_id_fkey FOREIGN KEY ("subscriberId") REFERENCES subscribers(subscriber_id);


--
-- Name: messages_bounce_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_bounce_type_id_fkey FOREIGN KEY ("bounceTypeId") REFERENCES "bounceTypes"("bounceTypeId");


--
-- Name: opens_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY opens
    ADD CONSTRAINT opens_message_id_fkey FOREIGN KEY ("messageId") REFERENCES messages("messageId");


--
-- PostgreSQL database dump complete
--

