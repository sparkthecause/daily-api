-- BLURB TYPES --

INSERT INTO "blurb_types"("blurb_type_id","name") VALUES
(E'483d79ff-e77e-4983-b371-265a811aff15',E'song'),
(E'8f1b2add-a069-4918-831d-aee235d47bdc',E'poll'),
(E'9a362542-862d-47f4-bf05-fb55a827f2ac',E'image-1'),
(E'ae28a399-b56e-4395-a4fa-b48b619fe67e',E'quote');

-- EDITIONS --

INSERT INTO "editions" ("edition_id","publish_on","subject","approved_at") VALUES
(E'346401bd-9957-4ee5-9bfc-f8f1b80cd767',E'2016-01-30',E'My First Edition!',E'2016-01-29 00:00:00');

-- BLURBS --

INSERT INTO "blurbs"("blurb_id","position","edition_id","approved_at","title","description","blurb_type","blurb_type_id") VALUES
(E'bf93e88e-0f70-4f44-bcb9-590239378171',1,E'346401bd-9957-4ee5-9bfc-f8f1b80cd767',E'2016-01-30 00:00:00',NULL,E'If you don\'t love yourself, how in the hell are you going to love somebody else?',E'text',E'ae28a399-b56e-4395-a4fa-b48b619fe67e'),
(E'e417eb5b-3080-433c-8c26-38d620428189',2,E'346401bd-9957-4ee5-9bfc-f8f1b80cd767',E'2016-01-30 17:29:01.090327',E'Panda, meet snow.',E'Watch as this panda rolls around in the snow and does adorable shit. Blizzards are for cuddles and pandas, y\'all.',E'text',E'9a362542-862d-47f4-bf05-fb55a827f2ac');

-- IMAGES --

INSERT INTO "images"("image_id","extension","position","href","blurb_id") VALUES
(E'270e0507-242b-4f78-bd65-e539219c8e22',E'jpg',1,E'http://www.theguardian.com/world/video/2016/jan/23/giant-panda-enjoys-the-snow-in-washington-dc-zoo-video',E'e417eb5b-3080-433c-8c26-38d620428189');

-- SUBSCRIBERS --

INSERT INTO "subscribers"("subscriber_id","email_address","created_at","unsubscribed_at") VALUES
(E'12488c27-6729-4f2b-b5d0-998781ab7309',E'charles@sparkthecause.com',E'2016-01-30 17:25:58.657227',NULL);
